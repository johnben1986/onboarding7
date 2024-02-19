import useWallet from "hooks/useWallet";
import { useAPI } from "hooks/useAPI";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getReferralCode } from "./ReferralManager";
import prettyBytes from "pretty-bytes";
import { useRouter } from "next/router";

function DebugPage() {
  const { currentAddress, getContract } = useWallet();
  const { api } = useAPI();
  const [state, setState] = useState({});
  const [refresh, setRefresh] = useState(0);

  const router = useRouter();
  const { search } = router.query;
  const params = new URLSearchParams(search);
  const user = params.get("user") || currentAddress;

  useEffect(() => {
    if (!currentAddress) return;

    async function fetchState() {
      const [hostingPlansServer, userHostingInfo, websitesAndPins, wb] =
        await Promise.all([
          api.getHostingPlans(),
          api.getUserHostingInfo({ id: user }),
          api.getWebsitesAndPins(),
          getContract({ name: "WebsiteBuilder", network: "polygon" }),
        ]);
      console.log(userHostingInfo);

      console.log("wb", wb);

      const price = await wb.initialPayment();
      console.log("price", price);

      const hostingPlansContract = await Promise.all(
        hostingPlansServer.map((plan) =>
          wb.paymentPerSecondMultiplied(plan.hash)
        )
      );

      const hostingPlans = [];

      for (const [i, plan] of hostingPlansServer.entries()) {
        hostingPlans.push({
          ...plan,
          ppsmContract: hostingPlansContract[i].toString(),
        });
      }

      const referralNames = ["freename", "othername"];
      const referralHashes = referralNames.map((name) =>
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name))
      );
      const referralFeeRecipients = await Promise.all(
        referralHashes.map((hash) => wb.referralFeeRecipients(hash))
      );
      const referralFeeBasisPoints = await Promise.all(
        referralHashes.map((hash) => wb.referralFeeBasisPoints(hash))
      );

      const referrals = [];
      for (const [i, name] of referralNames.entries()) {
        referrals.push({
          name,
          hash: referralHashes[i],
          recipient: referralFeeRecipients[i],
          basisPoints: referralFeeBasisPoints[i].toString(),
          percentage: (referralFeeBasisPoints[i].toNumber() / 10000) * 100,
        });
      }

      setState((s) => ({
        ...s,
        hostingPlans,
        userHostingInfo,
        referrals,
        websitesAndPins,
        currentRefferal: getReferralCode(),
      }));
    }
    fetchState();
  }, [currentAddress, user, api, refresh]);

  if (!currentAddress) {
    return <div>Please connect your wallet first</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-2">
      <button
        className="w-16 rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
        onClick={() => {
          setState({});
          setRefresh((r) => r + 1);
        }}
      >
        refresh
      </button>
      <div>
        <div className="text-xl">Hosting Plans</div>
        <div className="flex flex-wrap gap-2">
          {state.hostingPlans?.map((plan) => (
            <div key={plan.name}>
              <div>name: {plan.name}</div>
              <div>description: {plan.description}</div>
              <div>
                storage limit: {prettyBytes(+plan.storage_limit)} (
                {plan.storage_limit})
              </div>
              <div>
                monthly bandwidth limit:{" "}
                {prettyBytes(+plan.monthly_bandwidth_limit)} (
                {plan.monthly_bandwidth_limit})
              </div>
              <div>ppsm (server): {plan.payment_per_second_multiplied}</div>
              <div>
                per month (server):{" "}
                {ethers.utils.formatUnits(
                  ethers.BigNumber.from(plan.payment_per_second_multiplied)
                    .mul(60 * 60 * 24 * 30)
                    .div(ethers.BigNumber.from(10).pow(18)),
                  6
                )}{" "}
                USDC
              </div>
              <div>
                ppsm (contract): {plan.ppsmContract}{" "}
                {plan.ppsmContract === plan.payment_per_second_multiplied || (
                  <span className="text-bold text-red-600">DIFFERENT</span>
                )}
              </div>
              <div>
                per month (contract):{" "}
                {ethers.utils.formatUnits(
                  ethers.BigNumber.from(plan.ppsmContract)
                    .mul(60 * 60 * 24 * 30)
                    .div(ethers.BigNumber.from(10).pow(18)),
                  6
                )}{" "}
                USDC
              </div>
              <div>hash: {plan.hash}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xl">Referrals</div>
        <div className="text-lg">Current referral: {state.currentRefferal}</div>
        <div className="flex flex-wrap gap-2">
          {state.referrals?.map((referral) => (
            <div key={referral.name}>
              <div>name: {referral.name}</div>
              <div>recipient: {referral.recipient}</div>
              <div>
                commission: {referral.percentage}% ({referral.basisPoints} bp)
              </div>
              <div>hash: {referral.hash}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xl">Current user hosting plans</div>
        <div className="flex flex-wrap gap-2">
          <div>
            {state?.userHostingInfo?.subscriptions.map((subscription) => (
              <div key={subscription.planHash}>
                <div>plan: {subscription.plan_name}</div>
                <div>expires: {subscription.to_date}</div>
              </div>
            ))}
          </div>
          <div>
            {state?.userHostingInfo?.websites.map((website, index) => (
              <div key={index}>{JSON.stringify(website)}</div>
            ))}
          </div>
          <div>{JSON.stringify(state?.userHostingInfo)}</div>
        </div>
      </div>
      <div>
        <div className="text-xl">Websites and pins</div>
        <WebsiteAndPins websitesAndPins={state.websitesAndPins} />
      </div>
    </div>
  );
}

function WebsiteAndPins({ websitesAndPins }) {
  if (!websitesAndPins) {
    return "Websites and pins did not load correctly";
  }

  const rows = [];
  for (const website of websitesAndPins.websites) {
    rows.push({ website });
  }

  console.log(rows);

  for (const dbPin of websitesAndPins.dbPins) {
    const found = rows.find((row) => row?.website?.pin_id === dbPin.id);
    if (found) {
      found.dbPin = dbPin;
    } else {
      rows.push({ dbPin });
    }
  }

  for (const pinataPin of websitesAndPins.pinataPins) {
    const found = rows.find(
      (row) => row?.dbPin?.ipfs_hash === pinataPin.ipfs_pin_hash
    );
    if (found) {
      found.pinataPin = pinataPin;
    } else {
      rows.push({ pinataPin });
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <table className="w-fit">
        <thead>
          <tr>
            <th className="border border-gray-300 p-1">website approx size</th>
            <th className="border border-gray-300 p-1">pinataPin size</th>
            <th className="border border-gray-300 p-1">dbPin size</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="break-all border border-gray-300 p-1">
                {row?.website?.json_length}
              </td>
              <td className="break-all border border-gray-300 p-1">
                {row?.pinataPin?.size}
              </td>
              <td className="break-all border border-gray-300 p-1">
                {row?.dbPin?.size}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th className="border border-gray-300 p-1">Website</th>
            <th className="border border-gray-300 p-1">Pinata Pin</th>
            <th className="border border-gray-300 p-1">DB Pin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="break-all border border-gray-300 p-1">
                {JSON.stringify(row.website)}
              </td>
              <td className="break-all border border-gray-300 p-1">
                {JSON.stringify(row.pinataPin)}
              </td>
              <td className="break-all border border-gray-300 p-1">
                {JSON.stringify(row.dbPin)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DebugPage;
