import styles from "./DomainPage.module.scss";
import config from "../../../config/web3";
import { DatePicker } from "antd";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { useAPI } from "../../src/hooks/useAPI";
import useWallet from "../../src/hooks/useWallet";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import { isUrlFound } from "helpers/utils";
import { ethers } from "ethers";

import Modal from "components/Modal/Modal";
import * as moment from "moment";
import Loading from "components/utils/Loading";
import { BsEyeFill } from "react-icons/bs";
import Link from "next/link";

import { API } from "../../src/hooks/API.js";
import MetadataHelper from "components/MetadataHelper";
import Image from "next/image";
import Button from "components/utils/Button";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";

const oneTimeApproveAmount = ethers.BigNumber.from(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935",
);

const SECONDS_IN_MONTH = 60 * 60 * 24 * 30;

function numberInput(
  number,
  { min, max, precision, default: defaultValue } = {},
) {
  min = min || 0;
  max = max || Infinity;

  if (number === "") {
    return "";
  }
  const parsedNumber = parseFloat(number);
  if (isNaN(parsedNumber)) {
    return defaultValue;
  }

  if (parsedNumber < min) {
    return min;
  }

  if (parsedNumber > max) {
    return max;
  }

  if (precision !== undefined) {
    return +parsedNumber.toFixed(precision);
  }

  return parsedNumber;
}

function truncate(input, length) {
  if (!input) {
    return "";
  }
  if (input.length > length) {
    return input.substring(0, length) + "...";
  }
  return input;
}

function parseEther(value, currency) {
  if (!currency.decimals) {
    throw new Error("Currency must have decimals");
  }
  return ethers.utils.parseUnits(value, currency.decimals);
}

function formatEther(value, currency) {
  if (!currency.decimals) {
    throw new Error("Currency must have decimals");
  }

  return ethers.utils.formatUnits(value, currency.decimals);
}

function betaDisallowed() {
}

function ViewCounter({ domainId }) {
  const { api } = useAPI();
  const [views, setViews] = useState(0);

  useEffect(() => {
    async function getViews() {
      const views = await api.getDomainViews({
        id: domainId,
        addView: true,
      });
      setViews(views);
    }
    getViews();
  }, [domainId, api]);

  return (
    <>
      <div className="flex items-center gap-1 font-brand-tomorrow text-lg font-bold text-gray-400">
        <BsEyeFill /> {views.view_count}
      </div>
    </>
  );
}

export default function DomainPage({ domainInfoFromServer }) {
  //console.log('domainInfoFromServer',domainInfoFromServer)
  const router = useRouter();
  const { domainName } = router.query;
  const { api } = useAPI();
  const {
    currentAddress,
    getContract,
    sendContractTransaction,
    signTypedData,
    wrapWalletFlow,
  } = useWallet();

  const PAYMENT_PER_SECOND_MULTIPLIER = ethers.BigNumber.from(
    config.PAYMENT_PER_SECOND_MULTIPLIER,
  );

  //console.log(domainName);

  function calculateFullPaymentAmount(
    extendPeriodStartTime,
    extendToTime,
    currentEndTime,
    paymentPerSecond,
    yearlyPriceIncreaseBasisPoints,
  ) {
    let fullPaymentAmount = BigInt(0);
    paymentPerSecond = BigInt(paymentPerSecond);
    extendPeriodStartTime = BigInt(extendPeriodStartTime);
    extendToTime = BigInt(extendToTime);
    currentEndTime = BigInt(currentEndTime);
    yearlyPriceIncreaseBasisPoints = BigInt(yearlyPriceIncreaseBasisPoints);
    const YEAR = BigInt(365 * 24 * 60 * 60);
    //console.log(extendPeriodStartTime, extendToTime);

    for (let i = extendPeriodStartTime; i < extendToTime; i += YEAR) {
      if (i >= currentEndTime) {
        if (i + YEAR > extendToTime) {
          fullPaymentAmount += (extendToTime - i) * paymentPerSecond;
        } else {
          fullPaymentAmount += YEAR * paymentPerSecond;
        }
      } else if (i + YEAR > currentEndTime) {
        fullPaymentAmount += (i + YEAR - currentEndTime) * paymentPerSecond;
      }

      paymentPerSecond +=
        (paymentPerSecond * yearlyPriceIncreaseBasisPoints) / BigInt(10000);
    }
    fullPaymentAmount /= BigInt(config.PAYMENT_PER_SECOND_MULTIPLIER);

    return fullPaymentAmount;
  }

  const [domainInfo, setDomainInfo] = useState(domainInfoFromServer);

  async function getExchangeName() {
    if (domainInfo.provider_name == "freename") {
      return "ExchangeFreename";
    }
    if (domainInfo.provider_name == "unstoppable") {
      return "Exchange";
    }
    if (domainInfo.provider_name == "ens") {
      return "ExchangeENS";
    }
    throw new Error("Unknown domain provider");
  }

  async function getRentingName() {
    if (domainInfo.provider_name == "freename") {
      return "LeasingFreename";
    }
    if (domainInfo.provider_name == "unstoppable") {
      return "Leasing";
    }
    throw new Error("Unknown leasing domain provider");
  }

  function getNetwork() {
    if (domainInfo.provider_name == "freename") {
      return "polygon";
    }
    if (domainInfo.provider_name == "unstoppable") {
      return "polygon";
    }
    if (domainInfo.provider_name == "ens") {
      return "ethereum";
    }
  }

  async function signBuyOrder(order) {
    const domain = {
      name: "Web3 Onboarding",
      version: "1.0",
      chainId: config.networks[getNetwork()].chainId,
      verifyingContract: config.contractAddresses[await getExchangeName()],
    };

    return await signTypedData({
      types: {
        EIP712Domain: config.eip712Domain.fields,
        Order: config.eip712Order.fields,
      },
      domain: domain,
      primaryType: "Order",
      message: order,
    });
  }

  async function signLeaseOrder(order) {
    const domain = {
      name: "Web3 Onboarding",
      version: "1.0",
      chainId: config.networks[getNetwork()].chainId,
      verifyingContract: config.contractAddresses[await getRentingName()],
    };

    return await signTypedData({
      types: {
        EIP712Domain: config.eip712Domain.fields,
        LeaseOrder: config.eip712LeaseOrder.fields,
      },
      domain: domain,
      primaryType: "LeaseOrder",
      message: order,
    });
  }

  const [profilePicExists, setProfilePicExists] = useState({
    seller: false,
    lessor: false,
  });
  const [ordersInfo, setOrdersInfo] = useState({
    listingsList: [],
    offersList: [],
    leaseOffersList: [],
    leaseListingsList: [],
    isErc20Offer: false,
  });

  const isOwner = domainInfo ? domainInfo.seller_id == currentAddress : false;


  const [currencies, setCurrencies] = useState(null);

  // const [expirationDate, setExpirationDate] = useState(moment().add(1, "year"));
  // const [listingDate, setlistingDate] = useState(moment().subtract(1, "year"));

  const [expirationDate, setExpirationDate] = useState(moment().add(1, "year"));
  const [listingDate, setlistingDate] = useState(moment().subtract(1, "year"));
  
  const [leasingCurrency, setLeasingCurrency] = useState(null);
  const [leasingMonthlyPrice, setLeasingMonthlyPrice] = useState("");
  const [leasingYearlyPriceIncrease, setLeasingYearlyPriceIncrease] =
    useState("0.00");
  const [leasingInitialPeriod, setLeasingInitialPeriod] = useState("2");
  const [chosenLeasingInitialPeriodPrice, setChosenLeasingInitialPeriodPrice] =
    useState(null);
  const leasingInitialPeriodPrice =
    chosenLeasingInitialPeriodPrice !== null
      ? chosenLeasingInitialPeriodPrice
      : leasingMonthlyPrice === ""
        ? ""
        : leasingMonthlyPrice * leasingInitialPeriod;

  const [leasingExtensionRequest, setLeasingExtensionRequest] = useState(null);
  const [leaseExtensionDate, setLeaseExtensionDate] = useState(null);
  const [currentCategoryPictureIndex, setCurrentCategoryPictureIndex] =
    useState(0);

  async function increaseTokenAllowance(currenyAddress, amount, contract) {
    const tokenContract = await getContract({
      name: "ERC20",
      address: currenyAddress,
      network: getNetwork(),
    });
    const currentlyAllowed = await tokenContract.allowance(
      currentAddress,
      contract.address,
    );

    if (currentlyAllowed.lt(amount)) {
      await sendContractTransaction(
        tokenContract,
        "approve",
        [contract.address, oneTimeApproveAmount],
        "Approve the currency",
      );
    }
  }

  async function approveDomainContract(contract, providerName) {
    let contractName = "";
    if (providerName == "freename") {
      contractName = "FNSRegistry";
    } else if (providerName == "unstoppable") {
      contractName = "UnstoppableDomains";
    } else if (providerName == "ens") {
      contractName = "ENSRegistry";
    }
    const domainContract = await getContract({
      name: contractName,
      network: getNetwork(),
    });
    const allowed = await domainContract.isApprovedForAll(
      currentAddress,
      contract.address,
    );
    if (!allowed) {
      await sendContractTransaction(
        domainContract,
        "setApprovalForAll",
        [contract.address, true],
        "Approve your domains",
      );
    }
  }

  async function handleMakeOrder(values) {
    betaDisallowed();

    await wrapWalletFlow("Create Order", async () => {

      const currency = currencies.find((c) => c.id == values.currency);
      const currencyAddress = currency.address;

      const exchange = await getContract({
        name: await getExchangeName(),
        network: getNetwork(),
      });
      const tokenId = domainInfo.token_id;

      //console.log("address", exchange);
      // const nonces = await exchange.nonce(currentAddress).toString();
      // console.log("Nonce: " + nonces);
      
      const order = {
        maker: currentAddress,
        isErc20Offer: values.isErc20Offer,
        tokenId: tokenId,
        currencyContract: currencyAddress,
        amount: parseEther(values.order_amount, currency).toString(),
        nonce: (await exchange.nonce(currentAddress)).toString(),
        listingNonce: (await exchange.listingNonce(tokenId)).toString(),
        offerNonce: (
          await exchange.offerNonce(tokenId, currentAddress)
        ).toString(),
        listingTime: 0,
        //listingTime: listingDate.unix(),
        expirationTime: expirationDate.unix(),
        salt: Math.floor(Math.random() * (1000000 - 1) + 1),
      };

      if (order.isErc20Offer && currencyAddress != nativeAddress) {
        await increaseTokenAllowance(currencyAddress, order.amount, exchange);
      }

      if (!order.isErc20Offer) {
        await approveDomainContract(exchange, domainInfo.provider_name);
      }

      const encodedSig = await signBuyOrder(order);

      await api.addOrder({
        creator_id: order.maker,
        price: order.amount,
        currency_id: values.currency,
        domain_id: +domainInfo.id,
        is_erc_20_offer: order.isErc20Offer,
        signed_message: encodedSig,
        order_data_json: order,
      });

      const newOrders = await api.getOrders({
        domain_id: +domainInfo.id,
        is_erc_20_offer: order.isErc20Offer,
      });

      setOrdersInfo({
        ...ordersInfo,
        [order.isErc20Offer ? "offersList" : "listingsList"]:
          newOrders.result || [],
      });
    });
  }

  async function handleMakeLeasingOrder() {
    betaDisallowed();
    await wrapWalletFlow("Creating Rent Order", async () => {
      const isOffer = !isOwner;



      const currency = currencies.find((c) => c.id == leasingCurrency);

      const exchange = await getContract({
        name: await getExchangeName(),
        network: getNetwork(),
      });
      const leasing = await getContract({
        name: await getRentingName(),
        network: getNetwork(),
      });

      const tokenId = domainInfo.token_id;

      const paymentPerSecondWei = parseEther("" + leasingMonthlyPrice, currency)
        .mul(PAYMENT_PER_SECOND_MULTIPLIER)
        .div(SECONDS_IN_MONTH)
        .toString();
      const yearlyPriceIncreaseBasisPoints = Math.round(
        leasingYearlyPriceIncrease * 100,
      );
      const initialPeriodSeconds = leasingInitialPeriod * SECONDS_IN_MONTH;
      const initialPeriodPriceWei = parseEther(
        "" + leasingInitialPeriodPrice,
        currency,
      );

      const currentTime = Math.floor(Date.now() / 1000);

      const order = {
        maker: currentAddress,
        isErc20Offer: isOffer,
        tokenId: tokenId,
        currencyContract: currency.address,

        paymentPerSecond: paymentPerSecondWei,
        yearlyPriceIncreaseBasisPoints:
          yearlyPriceIncreaseBasisPoints.toString(),
        initialPeriodSeconds: initialPeriodSeconds.toString(),
        initialPeriodPrice: initialPeriodPriceWei.toString(),

        nonce: (await exchange.nonce(currentAddress)).toString(),
        listingNonce: (await exchange.listingNonce(tokenId)).toString(),
        offerNonce: (
          await exchange.offerNonce(tokenId, currentAddress)
        ).toString(),
        listingTime: 0,
        //listingTime: listingDate.unix(),
        expirationTime: expirationDate.unix(),
        salt: Math.floor(Math.random() * (1000000 - 1) + 1),
      };

      if (isOffer && currency.address != nativeAddress) {
        const amount = (
          calculateFullPaymentAmount(
            currentTime + parseInt(order.initialPeriodSeconds),
            leaseExtensionDate.unix(),
            currentTime + parseInt(order.initialPeriodSeconds),
            order.paymentPerSecond,
            order.yearlyPriceIncreaseBasisPoints,
          ) + BigInt(order.initialPeriodPrice)
        ).toString();
        await increaseTokenAllowance(currency.address, amount, leasing);
      }

      if (isOwner) {
        await approveDomainContract(leasing, domainInfo.provider_name);
      }

      // console.log("isErc20Offer2", order.isErc20Offer);

      const encodedSig = await signLeaseOrder(order);



      await api.addLeaseOrder({
        creator_id: order.maker,
        currency_id: leasingCurrency,
        domain_id: +domainInfo.id,
        is_erc_20_offer: isOffer,
        signed_message: encodedSig,
        order_data_json: order,
      });

      const newLeaseOrders = await api.getLeasingOrders({
        domain_id: +domainInfo.id,
        is_erc_20_offer: isOffer,
      });

      setOrdersInfo({
        ...ordersInfo,
        [isOffer ? "leaseOffersList" : "leaseListingsList"]:
          newLeaseOrders.result || [],
      });
    });
  }

  const cancelLeasse = async () => {
    const leasing = await getContract({
      name: await getRentingName(),
      network: getNetwork(),
    });
    const tokenId = domainInfo.token_id;
    await sendContractTransaction(
      leasing,
      "unleaseDomain",
      [tokenId],
      "Leasse domain",
    );
  };

  const prepareOrders = async (
    baseOrder,
    signature,
    totalPrice,
    signFunction,
    contract,
    exchange,
  ) => {
    let res = {};
    const orderA = baseOrder;
    const orderB = {
      ...baseOrder,
      maker: currentAddress,
      salt: Math.floor(Math.random() * (1000000 - 1) + 1),
      nonce: (await exchange.nonce(currentAddress)).toString(),
      offerNonce: (
        await exchange.offerNonce(baseOrder.tokenId, currentAddress)
      ).toString(),
    };
    if (orderA.isErc20Offer) {
      orderB.isErc20Offer = false;

      res.firstOrder = orderB;
      res.firstSignature = await signFunction(orderB);

      res.secondOrder = orderA;
      res.secondSignature = signature;

      await approveDomainContract(contract, domainInfo.provider_name);
    } else {
      orderB.isErc20Offer = true;
      res.firstOrder = orderA;
      res.firstSignature = signature;

      res.secondOrder = orderB;
      res.secondSignature = await signFunction(orderB);

      if (orderA.currencyContract != nativeAddress) {
        await increaseTokenAllowance(
          orderA.currencyContract,
          totalPrice,
          contract,
        );
      }
    }
    console.log("PREPARATION", res);
    return res;
  };

  async function leaseOrder(order, leaseExtensionDate) {
    betaDisallowed();

    await wrapWalletFlow("Rent domain", async () => {
      const leasing = await getContract({
        name: await getRentingName(),
        network: getNetwork(),
      });
      const exchange = await getContract({
        name: await getExchangeName(),
        network: getNetwork(),
      });
      const baseOrder = order.order_json.data;

      const currentTime = Math.floor(Date.now() / 1000);
      const extendToTime = leaseExtensionDate.unix() + 900;
      const extendPeriodStartTime =
        currentTime + parseInt(baseOrder.initialPeriodSeconds);

      const amount = (
        calculateFullPaymentAmount(
          extendPeriodStartTime,
          extendToTime,
          extendPeriodStartTime,
          baseOrder.paymentPerSecond,
          baseOrder.yearlyPriceIncreaseBasisPoints,
        ) + BigInt(baseOrder.initialPeriodPrice)
      ).toString();
      // console.log("AMOUNT", amount, extendPeriodStartTime);

      const { firstOrder, secondOrder, firstSignature, secondSignature } =
        await prepareOrders(
          baseOrder,
          order.order_json.signature,
          amount,
          signLeaseOrder,
          leasing,
          exchange,
        );
      let overrides = {};
      if (nativeAddress == firstOrder.currencyContract)
        overrides = { value: amount };
      // console.log("EXTEND TO", extendToTime);
      // console.log(firstOrder);
      await sendContractTransaction(
        leasing,
        "atomicMatchAndExtendLease",
        [
          firstOrder,
          secondOrder,
          firstSignature,
          secondSignature,
          extendToTime,
          overrides,
        ],
        "Start renting",
      );

      reloadOrdersList({
        isErc20Offer: order.is_erc_20_offer,
        isLeasing: true,
      });
    });
  }

  async function buyOrder(order) {
    betaDisallowed();
  
    await wrapWalletFlow(
      order.isErc20Offer ? "Accept offer" : "Buy domain",
      async () => {
        const exchange = await getContract({
          name: await getExchangeName(),
          network: getNetwork(),
        });

        const { firstOrder, secondOrder, firstSignature, secondSignature } =
          await prepareOrders(
            order.order_json.data,
            order.order_json.signature,
            order.order_json.data.amount,
            signBuyOrder,
            exchange,
            exchange,
          );

        let overrides = { gasLimit: 300000};
        if (nativeAddress == firstOrder.currencyContract)
          
        overrides = { value: firstOrder.amount};

        // await sendContractTransaction(
        //   exchange,
        //   "atomicMatch",
        //   [firstOrder, secondOrder, firstSignature, secondSignature, overrides],
        //   "Transfer domain",
        // );
        await sendContractTransaction(
          exchange,
          "atomicMatch",
          [firstOrder, secondOrder, firstSignature, secondSignature, overrides],
          "Transfer domain",
        );
        reloadOrdersList({
          isErc20Offer: order.is_erc_20_offer,
          isLeasing: false,
        });
      },
    );
  }

  async function reloadOrdersList({ isErc20Offer, isLeasing }) {
    const response = await api[isLeasing ? "getLeasingOrders" : "getOrders"]({
      domain_id: +domainInfo.id,
      is_erc_20_offer: isErc20Offer,
    });

    setOrdersInfo((ordersInfo) => ({
      ...ordersInfo,
      [isLeasing
        ? isErc20Offer
          ? "leaseOffersList"
          : "leaseListingsList"
        : isErc20Offer
          ? "offersList"
          : "listingsList"]: response.result || [],
    }));
  }

  async function cancelOrder({ isLeasing, order }) {
    let contract = null;
    if (isLeasing) {
      contract = await getContract({
        name: await getRentingName(),
        network: getNetwork(),
      });
    } else {
      contract = await getContract({
        name: await getExchangeName(),
        network: getNetwork(),
      });
    }
    const orderData = order.order_json.data;

    await sendContractTransaction(
      contract,
      "cancelOrder",
      [orderData],
      "Cancel order",
    );

    await reloadOrdersList({ isLeasing, isErc20Offer: order.is_erc_20_offer });
  }

  useEffect(() => {
    async function getDomain() {
      const response = await api.getDomain({ name: domainName });

      // console.log("domains array", response);
      // console.log(response.result[0]);
      setDomainInfo(response.result[0]);

      setProfilePicExists({
        seller:
          (await isUrlFound(
            `${process.env.NEXT_PUBLIC_IMAGES_URL}/vendors/${response.result[0].seller_id}.png`,
          )) == true,
        lessor:
          (await isUrlFound(
            `${process.env.NEXT_PUBLIC_IMAGES_URL}/vendors/${response.result[0].leasing_lessee}.png`,
          )) == true,
      });
    }
    getDomain();
  }, [domainName, api]);

  useEffect(() => {
    if (!domainInfo?.id) {
      return;
    }
    async function getCurrencies() {
      const response = await api.getCurrencies({
        domain_id: +domainInfo.id,
        chain: getNetwork(),
      });

      setCurrencies(response.result || []);
      const filtered = filteredCurrencies(!isOwner, response.result);
      setLeasingCurrency(filtered[0].id);
    }

    reloadOrdersList({ isErc20Offer: false });
    reloadOrdersList({ isErc20Offer: true });
    reloadOrdersList({ isErc20Offer: false, isLeasing: true });
    reloadOrdersList({ isErc20Offer: true, isLeasing: true });
    getCurrencies();
  }, [domainInfo?.id, api, isOwner]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentCategoryPictureIndex(
          (c) => (c + 1) % (domainInfo?.category_array?.length || 1),
        ),
      3000,
    );
    return () => clearInterval(interval);
  }, [domainInfo?.category_array]);

  const nativeAddress = "0x0000000000000000000000000000000000000000";

  const filteredCurrencies = (isErc20Offer, currenciesArray) => {
    currenciesArray = currenciesArray || currencies;
    return currenciesArray.filter((c) => {
      if (isErc20Offer) {
        return c.address != nativeAddress;
      }
      return true;
    });
  };

  const currencySelectorStyle =
    "px h-12 rounded-md border-0 py-0 pr-2 text-lg focus:outline-none bg-blue-500";

  const currencySelector = (
    isErc20Offer,
    selectedCurrency,
    setSelectedCurrency,
  ) => {
    if (selectedCurrency === undefined) {
      return (
        <select
          className={currencySelectorStyle}
          name="currency"
          id="offer-currency"
        >
          {filteredCurrencies(isErc20Offer).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      );
    } else {
      const filtered = filteredCurrencies(isErc20Offer);
      if (filtered.length == 0) {
        return <select className={currencySelectorStyle}></select>;
      }
      if (selectedCurrency === null) {
        selectedCurrency = filtered[0].id;
      }

      return (
        <select
          className={currencySelectorStyle}
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {filtered.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      );
    }
  };

  const tableListHeadingClassName = "front-brand-tomorrow text-xl font-light inline-block border-b-2 border-white pb-1 mb-3 border-width-5";
  const tableItemClassName = "flex w-1/4 place-items-center justify-center";
  const actionButtonClassName = "!text-2xs sm:!text-base bg-white !text-black hove:text-black hover:bg-white";
  const listLink =
    "cursor-pointer bg-none shadow-none hover:text-brand-primary";
  const orderList = (isOffer) => {
    const arr = isOffer ? ordersInfo.offersList : ordersInfo.listingsList;



    return (
      <div className="mt-6 space-y-4 text-white lg:mt-0 lg:w-3/6 md:w-6/6">
        {isOffer ? (
          <>
            <div className="h-96 overflow-y-auto rounded-r-2xl border border-white p-4 text-center bg-blue-900">
              <h4 className={tableListHeadingClassName}>Current offers</h4>
              <div className="flex text-center text-lg font-light sm:text-2xl text-white opacity-80">
                <div className="w-1/4">Price</div>
                <div className="w-1/4">Expiration</div>
                <div className="w-1/4">From</div>
                <div className="w-1/4">Action</div>
              </div>

              {arr.map((el) => (
                <div
                  key={el.id}
                  className="mt-2 flex text-center text-2xs sm:text-base text-white"
                >
                  <div className={tableItemClassName}>
                    {formatEther(
                      el.price,
                      currencies.find((c) => c.id == el.currency_id),
                    )}{" "}
                    {currencies.find((c) => c.id == el.currency_id)?.name}
                  </div>
                  <div className={tableItemClassName}>
                    {new Date(
                      el.order_json.data.expirationTime * 1000,
                    ).toLocaleString()}
                  </div>
                  <div className={tableItemClassName}>
                    <Link className={listLink} href={`/users/${el.creator_id}`}>
                      {truncate(el.creator_name, 14)}
                    </Link>
                  </div>
                  {(isOffer && isOwner) ||
                    (!isOffer &&
                      !isOwner &&
                      el.creator_id == domainInfo.seller_id) ? (
                    <div className={tableItemClassName}>
                      <Button
                        type="primary"
                        className={actionButtonClassName}
                        onClick={() => buyOrder(el)}
                      >
                        {isOffer ? "Accept" : "Buy"}
                      </Button>
                    </div>
                  ) : (
                    <div className={tableItemClassName}>
                      {el.creator_id == currentAddress && (
                        <Button
                          type="primary"
                          className={actionButtonClassName}
                          onClick={() =>
                            cancelOrder({ isLeasing: false, order: el })
                          }
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>

        ) : (
          <>
            <div className="h-96 overflow-y-auto rounded-l-2xl border border-white p-4 text-center bg-blue-900">
              <h4 className={tableListHeadingClassName}>Current listings</h4>
              <div className="flex text-center text-lg font-light sm:text-2xl text-white opacity-80 ">
                <div className="w-1/4">Price</div>
                <div className="w-1/4">Expiration</div>
                <div className="w-1/4">From</div>
                <div className="w-1/4">Action</div>
              </div>

              {arr.map((el) => (
                <div
                  key={el.id}
                  className="mt-2 flex text-center text-2xs sm:text-base text-white"
                >
                  <div className={tableItemClassName}>
                    {formatEther(
                      el.price,
                      currencies.find((c) => c.id == el.currency_id),
                    )}{" "}
                    {currencies.find((c) => c.id == el.currency_id)?.name}
                  </div>
                  <div className={tableItemClassName}>
                    {new Date(
                      el.order_json.data.expirationTime * 1000,
                    ).toLocaleString()}
                  </div>
                  <div className={tableItemClassName}>
                    <Link className={listLink} href={`/users/${el.creator_id}`}>
                      {truncate(el.creator_name, 14)}
                    </Link>
                  </div>
                  {(isOffer && isOwner) ||
                    (!isOffer &&
                      !isOwner &&
                      el.creator_id == domainInfo.seller_id) ? (
                    <div className={tableItemClassName}>
                      <Button
                        type="primary"
                        className={actionButtonClassName}
                        onClick={() => buyOrder(el)}
                      >
                        {isOffer ? "Accept" : "Buy"}
                      </Button>
                    </div>
                  ) : (
                    <div className={tableItemClassName}>
                      {el.creator_id == currentAddress && (
                        <Button
                          type="primary"
                          className={actionButtonClassName}
                          onClick={() =>
                            cancelOrder({ isLeasing: false, order: el })
                          }
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    );
  };

  const tableItemLeaseClassName =
    "flex flex-col w-1/4 place-items-center justify-center";
  const leaseOrderList = (isOffer) => {
    const arr = isOffer
      ? ordersInfo.leaseOffersList
      : ordersInfo.leaseListingsList;



    return (
      <div className="mt-6 w-full space-y-4 px-4 pt-2 text-black lg:mt-0 lg:w-3/5">
        {isOffer ? (
          <h4 className={tableListHeadingClassName}>Current rent offers</h4>
        ) : (
          <h4 className={tableListHeadingClassName}>Current rent listings</h4>
        )}
        <div className="h-96 overflow-y-auto rounded-2xl bg-brand-background p-4">
          <div className="flex text-center text-sm font-bold sm:text-2xl">
            <div className="w-1/4">Price</div>
            <div className="w-1/4">Initial period</div>
            <div className="w-1/4">From</div>
            <div className="w-1/4">Action</div>
          </div>

          <div className="w-full rounded border-2 border-white"> </div>

          {arr.map((el) => (
            <div
              key={el.id}
              className="mb-2 flex text-center text-2xs sm:text-base"
            >
              <div className={tableItemLeaseClassName}>
                {Math.round(
                  formatEther(
                    ethers.BigNumber.from(el.order_json.data.paymentPerSecond)
                      .mul(SECONDS_IN_MONTH)
                      .div(PAYMENT_PER_SECOND_MULTIPLIER),
                    currencies.find((c) => c.id == el.currency_id),
                  ) * 1e4,
                ) / 1e4}{" "}
                {currencies.find((c) => c.id == el.currency_id)?.name}
                {" / month"}
                <br />
                {el.order_json.data.yearlyPriceIncreaseBasisPoints / 100}
                {" % yearly increase"}
              </div>
              <div className={tableItemLeaseClassName}>
                {el.order_json.data.initialPeriodSeconds / SECONDS_IN_MONTH}{" "}
                months <br /> for{" "}
                {Math.round(
                  formatEther(
                    ethers.BigNumber.from(
                      el.order_json.data.initialPeriodPrice,
                    ),
                    currencies.find((c) => c.id == el.currency_id),
                  ) * 1e4,
                ) / 1e4}{" "}
                {currencies.find((c) => c.id == el.currency_id)?.name}
              </div>
              <div className={tableItemLeaseClassName}>
                <Link className={listLink} href={`/users/${el.creator_id}`}>
                  {truncate(el.creator_name, 14)}
                </Link>
                <br />
                Expires on{" "}
                {new Date(
                  el.order_json.data.expirationTime * 1000,
                ).toDateString()}
              </div>
              {(isOffer && isOwner) || (!isOffer && !isOwner) ? (
                (domainInfo.leasing_lessee == null ||
                  domainInfo.leasing_lessee == nativeAddress) && (
                  <div className={tableItemLeaseClassName}>
                    <Button
                      type="primary"
                      className={actionButtonClassName}
                      onClick={() =>
                        setLeasingExtensionRequest({
                          name: "Rent this domain",
                          order: el,
                        })
                      }
                    >
                      {isOffer ? "Accept" : "Rent"}
                    </Button>
                  </div>
                )
              ) : (
                <div className={tableItemLeaseClassName}>
                  {el.creator_id == currentAddress && (
                    <Button
                      type="primary"
                      className={actionButtonClassName}
                      onClick={() =>
                        cancelOrder({ isLeasing: true, order: el })
                      }
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const extendPeriodStartTime =
    leasingExtensionRequest &&
    (leasingExtensionRequest.order
      ? Date.now() / 1000 +
      +leasingExtensionRequest.order.order_json.data.initialPeriodSeconds
      : domainInfo.leasing_order_json.data.extendPeriodStartTime);

  const extensionOrder =
    leasingExtensionRequest &&
    (leasingExtensionRequest.order
      ? leasingExtensionRequest.order.order_json.data
      : domainInfo.leasing_order_json.data);

  useEffect(() => {
    setLeaseExtensionDate(moment(extendPeriodStartTime * 1000));
  }, [!!leasingExtensionRequest]);

  if (router.isFallback) {
    console.log("fallback!!!!!!!!!!!!");
  }



  if (!domainInfo) {
    return <Loading />;
  }

  // console.log(domainInfo)
  return (
    <>
      <MetadataHelper
        title={domainInfo.name}
        description={domainInfo.description}
        canonical={`https://web3onboarding.com/marketplace/${domainName}`}
      ></MetadataHelper>
      <Modal
        isOpen={!!leasingExtensionRequest}
        onRequestClose={() => setLeasingExtensionRequest(null)}
      >
        {leasingExtensionRequest && (
          <>
            <h2>{leasingExtensionRequest?.name}</h2>
            <div className="flex flex-col items-start gap-7 p-5">
              <div>
                <span className="my-auto w-2/5 text-right">Rent until</span>
                <span className={styles.datePickerWrapper}>
                  <DatePicker
                    allowClear={false}
                    value={leaseExtensionDate}
                    onChange={(date) => setLeaseExtensionDate(date)}
                    disabledDate={(date) => {
                      return date.unix() < +extendPeriodStartTime;
                    }}
                  />
                </span>
              </div>
              <div>
                <span className="my-auto w-2/5 text-right">Price:</span>
                <span>
                  {" "}
                  {formatEther(
                    (
                      calculateFullPaymentAmount(
                        Math.floor(Date.now() / 1000) +
                        parseInt(extensionOrder.initialPeriodSeconds),
                        leaseExtensionDate.unix() + 900,
                        Math.floor(Date.now() / 1000) +
                        parseInt(extensionOrder.initialPeriodSeconds),
                        extensionOrder.paymentPerSecond,
                        extensionOrder.yearlyPriceIncreaseBasisPoints,
                      ) + BigInt(extensionOrder.initialPeriodPrice)
                    ).toString(),
                    currencies.find(
                      (c) =>
                        c.id ==
                        (leasingExtensionRequest.order
                          ? leasingExtensionRequest.order.currency_id
                          : domainInfo.leasing_order_json.data.currency_id),
                    ),
                  )}{" "}
                  {
                    currencies.find(
                      (c) => c.address == extensionOrder.currencyContract,
                    )?.name
                  }
                </span>
              </div>
              <a
                className={styles.actionButton}
                onClick={() => {
                  if (leasingExtensionRequest.order) {
                    leaseOrder(
                      leasingExtensionRequest.order,
                      leaseExtensionDate,
                    );
                    console.log(
                      "atomic match and extend to",
                      leasingExtensionRequest.order,
                      leaseExtensionDate,
                    );
                  } else {
                    console.log("extend to", leaseExtensionDate);
                  }
                }}
              >
                Confirm
              </a>
            </div>
          </>
        )}
      </Modal>
      <div className="bg-image4">
        {/* <Navbar title={`Domain: ${domainInfo.name}`} /> */}
        <div className="container py-7">
          <div className="border border-white rounded-lg w-full mb-5 text-white">
            <div className="lg:flex md:flex items-start bg-blue-900 rounded-lg">
              <div className="lg:w-[250px]">
                <Image
                  src={
                    domainInfo?.category_array.length > 0
                      ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${domainInfo?.category_array[currentCategoryPictureIndex].id}.png`
                      : "/assets/default-cover.png"
                  }
                  alt="categories"
                  className="self-center m-0 ml-auto mr-auto"
                  width={200}
                  height={200}
                ></Image>
              </div>
              <div className="lg:w-[calc(100%-250px)] md:w-[calc(100%-250px)] sm:w[100%] bg-blue-900 rounded-lg">
                <div className="w-full">
                  <div className="w-full lg:flex md:flex justify-around flex">
                    <div className="w-[10%] h-[100px]">
                      <h4 className="text-lg opacity-70">TLD/DOMAIN</h4>
                      <h3 className="fron-brand-heading text-5 md:text-xl">{domainInfo.name}</h3>
                    </div>
                    <div className="md:w-3/6 border-l border-white pl-10 h-[120px] lg:pl-10">
                      <h4 className="text-lg opacity-70">CATEGORIES</h4>
                      <ul>
                        {(domainInfo?.category_array || []).map((category) => (
                          <li key={category.id} className="md:!text-lg">{category.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <div className="w-[80%] text-center border border-white p-3 rounded-lg h-[100px]">
                      <h4 className="text-lg opacity-70">DESCRIPTION</h4>
                      <p>{domainInfo.description || ``}</p>
                    </div>
                    <div className="w-[50%] md:w-[20%] flex justify-center">
                      <ViewCounter domainId={domainInfo.id} />
                      <p className="mt-1 ml-1 text-gray-300">Views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-white rounded-md w-full p-3 mb-5 bg-blue-900">
            {currencies ? (
              <div className="space-y-4 pb-4 text-center font-brand-tomorrow text-lg text-white">
                {isOwner ? (
                  <h2 className="text-2xl">Make a listing for this domain</h2>
                ) : (
                  <h2 className="text-2xl">Make an offer to buy this domain</h2>
                )}
                <div className="flex justify-center space-x-4">
                  <input
                    className="h-12 w-64 border-none bg-white text-black pl-4 text-lg shadow-lg outline-none"
                    type="number"
                    id="order-amount-input"
                  />
                  <span >{currencySelector(!isOwner)}</span>
                </div>
                <Button
                  className="bg-white !text-black lg:text-black hover:bg-white hover:lg:text-black"
                  onClick={() =>
                    handleMakeOrder({
                      currency: document.getElementById("offer-currency").value,
                      order_amount:
                        document.getElementById("order-amount-input").value,
                      isErc20Offer: !isOwner,
                    })
                  }
                >
                  {isOwner ? "Make listing" : "Make an offer"}
                </Button>
                {isOwner ? (
                  <div className="text-center text-white">
                    Web3 Onboarding charges a 2.25% Fee on each sale.
                  </div>
                ) : null}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mx-auto mb-12 text-center font-normal">
          {currencies ? (
            <div className="space-y-4 bg-brand-background pb-4 text-center font-brand-tomorrow text-lg text-black hidden">
              {isOwner ? (
                <h2 className="text-2xl">Make a listing for this domain</h2>
              ) : (
                <h2 className="text-2xl">Make an offer to buy this domain</h2>
              )}
              <div className="flex justify-center space-x-4">
                <input
                  className="h-12 w-64 border-none bg-white pl-4 text-lg shadow-lg outline-none"
                  type="number"
                  id="order-amount-input"
                />
                <span>{currencySelector(!isOwner)}</span>
              </div>
              <Button
                onClick={() =>
                  handleMakeOrder({
                    currency: document.getElementById("offer-currency").value,
                    order_amount:
                      document.getElementById("order-amount-input").value,
                    isErc20Offer: !isOwner,
                  })
                }
              >
                {isOwner ? "Make listing" : "Make offer"}
              </Button>
              {isOwner ? (
                <div className="text-center text-black">
                  Web3 Onboarding charges a 2.25% Fee on each sale.
                </div>
              ) : null}
            </div>
          ) : (
            <></>
          )}
          <div className="w-full flex-wrap justify-between text-left lg:flex ">
            <div className="mx-4 space-y-4 text-black lg:mx-0 lg:w-2/5 lg:p-2 hidden">
              <h4 className="front-brand-heading text-xl font-bold ">
                About Seller
              </h4>
              <div className="rounded-2xl bg-brand-background p-6">
                <Link href={`/users/${domainInfo.seller_id}`} className="flex">
                  <Image
                    src={
                      profilePicExists.seller
                        ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/vendors/${domainInfo.seller_id}.png`
                        : "/assets/images/png/seller-profile.png"
                    }
                    alt="profile picture"
                    className="w-1/5"
                    width={280}
                    height={280}
                  ></Image>
                  <h3 className="my-auto text-lg">
                    {truncate(domainInfo.seller_name, 22)}
                  </h3>
                </Link>
                <div className="mt-3 font-brand-tomorrow text-lg">
                  {domainInfo.seller_description}
                </div>
              </div>

              {domainInfo.leasing_lessee &&
                (domainInfo.leasing_lessee == nativeAddress ? (
                  <></>
                ) : (
                  <>
                    <h4>Currently leased by</h4>
                    <div>
                      <Link href={`/users/${domainInfo.leasing_lessee}`}>
                        <Image
                          src={
                            profilePicExists.lessor
                              ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/vendors/${domainInfo.leasing_lessee}.png`
                              : "/assets/images/png/seller-profile.png"
                          }
                          alt="profile picture"
                          width={300}
                          height={300}
                        ></Image>
                        <h3>{domainInfo.leasing_lessee_name}</h3>
                      </Link>
                      <div>
                        Leased until:{" "}
                        {new Date(domainInfo.leasing_end_time * 1000).toString()}
                      </div>
                      <AuthenticatedFragment
                        permission="orders:cancel_lease"
                        owner={domainInfo.leasing_lessee}
                      >
                        <a
                          className={styles.actionButton}
                          onClick={() => {
                            setLeasingExtensionRequest({ name: "Extend rent" });
                          }}
                        >
                          Extend lease
                        </a>
                        <a
                          className={styles.actionButton}
                          onClick={() => {
                            cancelLeasse();
                          }}
                        >
                          Cancel
                        </a>
                      </AuthenticatedFragment>
                    </div>
                  </>
                ))}
            </div>
            {currencies ? (
              <>
                {orderList(false)}
                {orderList(true)}
              </>
            ) : (
              <></>
            )}
          </div>

          <br />
          {currencies &&
            domainInfo.provider_name != "ens" &&
            domainInfo.domain_type != "tld" ? (
            <div className="flex flex-wrap justify-around hidden">
              <div className="flex w-full flex-col items-center gap-7 text-black lg:w-2/5 hidden">
                {isOwner ? (
                  <h2 className="text-brand-tomorrow text-2xl">
                    Make a rent listing for this domain
                  </h2>
                ) : (
                  <h2 className="text-brand-tomorrow text-2xl">
                    Make a rent offer for this domain
                  </h2>
                )}
                <div className="flex flex-col items-center gap-7 rounded-2xl bg-brand-background p-8">
                  <div className="flex w-full flex-col gap-2 lg:flex-row">
                    <span className="my-auto w-full text-center lg:w-[37%] lg:text-right">
                      Monthly fee:{" "}
                    </span>
                    <div className="flex w-full gap-4 lg:w-3/5">
                      <input
                        className="pl-2"
                        value={leasingMonthlyPrice}
                        onChange={(e) =>
                          setLeasingMonthlyPrice(
                            e.target.value.replace(/[^\d.]/g, ""),
                          )
                        }
                      />
                      <span>
                        {currencySelector(
                          !isOwner,
                          leasingCurrency,
                          setLeasingCurrency,
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2 lg:flex-row">
                    <span className="my-auto w-full text-center lg:w-[37%] lg:text-right">
                      Yearly price increase (%):
                    </span>
                    <input
                      className="w-full pl-2 lg:w-3/5"
                      value={leasingYearlyPriceIncrease}
                      placeholder="0.00"
                      onChange={(e) =>
                        setLeasingYearlyPriceIncrease(
                          e.target.value.replace(/[^\d.]/g, ""),
                        )
                      }
                      onBlur={(e) =>
                        setLeasingYearlyPriceIncrease(
                          numberInput(e.target.value, { precision: 2 }),
                        )
                      }
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2 lg:flex-row">
                    <span className="my-auto w-full text-center lg:w-[37%] lg:text-right">
                      Initial period (months):
                    </span>
                    <input
                      className="w-full pl-2 lg:w-3/5"
                      value={leasingInitialPeriod}
                      placeholder="0"
                      onChange={(e) =>
                        setLeasingInitialPeriod(
                          e.target.value.replace(/\D /g, ""),
                        )
                      }
                      onBlur={(e) =>
                        setLeasingInitialPeriod(numberInput(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2 lg:flex-row">
                    <span className="my-auto w-full text-center lg:w-[37%] lg:text-right">
                      Intial period total price:
                    </span>
                    <div className="flex w-full gap-4 lg:w-3/5">
                      <input
                        className="pl-2"
                        value={leasingInitialPeriodPrice}
                        placeholder="0"
                        onChange={(e) =>
                          setChosenLeasingInitialPeriodPrice(
                            e.target.value.replace(/[^\d.]/g, ""),
                          )
                        }
                        onBlur={(e) =>
                          e.target.value != "" &&
                          setChosenLeasingInitialPeriodPrice(
                            numberInput(e.target.value),
                          )
                        }
                      />
                      <span>
                        {currencySelector(
                          !isOwner,
                          leasingCurrency,
                          setLeasingCurrency,
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button onClick={handleMakeLeasingOrder}>
                      {isOwner ? "Make listing" : "Make offer"}
                    </Button>
                  </div>
                  {isOwner ? (
                    <div className="text-center text-black">
                      Web3 Onboarding charges a 2.25% Fee on each sale.
                    </div>
                  ) : null}
                </div>
              </div>
              {leaseOrderList(false)}
              {leaseOrderList(true)}
            </div>
          ) : (
            <></>
          )}
        </div>
        </div>
        {/* Mobile */}
        <div className="flex w-full flex-col justify-center gap-10 bg-brand-background p-6 md:flex-row lg:p-12 hidden">
          <Image
            src={
              domainInfo?.category_array.length > 0
                ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${domainInfo?.category_array[currentCategoryPictureIndex].id}.png`
                : "/assets/default-cover.png"
            }
            alt="categories"
            className="self-center"
            width={300}
            height={300}
          ></Image>
          <div className="w-full space-y-3 text-lg text-black lg:w-1/2">
            {domainInfo.domain_type == "tld" ? (
              <h4 className="front-brand-tomorrow text-xl font-bold"> TLD </h4>
            ) : (
              <h4 className="front-brand-tomorrow text-xl font-bold"> Domain </h4>
            )}
            <h3 className="fron-brand-heading text-xl">{domainInfo.name}</h3>
            <div>
              <ViewCounter domainId={domainInfo.id} />
            </div>
            <h4 className="front-brand-tomorrow text-xl font-bold">
              Description
            </h4>
            <p>{domainInfo.description || ``}</p>
            <h4 className="front-brand-tomorrow text-xl font-bold">Categories</h4>

            <div className="mt-2 flex flex-wrap gap-4">
              {(domainInfo?.category_array || []).map((category) => (
                <Button
                  key={category.id}
                  className="md:!text-lg"
                  href={`/marketplace?s=${encodeURIComponent(
                    `{"filters":{"categories":[${category.id}]}}`,
                  )}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export async function getStaticProps(context) {
  const api = new API();

  try {

    return {
      props: {
        domainInfoFromServer: (
          await api.getDomain({
            name: context.params.domainName,
          })
        ).result[0],
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (e) {
    // console.log(e);
    return {
      notFound: true,
      revalidate: 5,
    };
  }
}

export async function getStaticPaths() {
  const api = new API();


  const domainNames = process.env.NEXT_PUBLIC_IS_TESTING
    ? []
    : await api.getAllDomainNames();

  return {
    paths: domainNames.map((name) => ({
      params: {
        domainName: name,
      },
    })),
    fallback: "blocking",
  };
}
