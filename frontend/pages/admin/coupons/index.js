import { useQuery, useQueryClient } from "@tanstack/react-query";
import MetadataHelper from "components/MetadataHelper";
import Button from "components/utils/Button";
import { useAPI } from "hooks/useAPI";
import useWallet from "hooks/useWallet";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Coupons() {
  const { api } = useAPI();
  const { currentAddress } = useWallet();
  const {
    data: coupons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => api.getAllCoupons(),
    enabled: !!currentAddress,
  });

  const queryClient = useQueryClient();

  if (!currentAddress) {
    return <div>Please connect your wallet</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading coupons</div>;
  }
  return (
    <div className="flex flex-col gap-4 text-lg">
      <MetadataHelper noindex />
      <h1 className="text-center text-3xl font-bold">Coupons</h1>
      <div className="flex flex-col items-center gap-4">
        <table>
          <thead>
            <tr>
              <th className="px-2 py-1">Code</th>
              <th className="px-2 py-1">Discount</th>
              <th className="px-2 py-1">Once Per Wallet</th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.code} className="border-y-2">
                <td className="px-2 py-1">{coupon.id}</td>
                <td className="px-2 py-1">
                  {coupon.discount}{" "}
                  {coupon.discount_type === "percentage" ? "%" : "USD"}
                </td>
                <td className="px-2 py-1">
                  {coupon.max_uses_per_wallet === 1 ? "Yes" : "No"}
                </td>
                <td className="flex gap-1 px-2 py-1">
                  <Button size="sm" href={`/admin/coupons/${coupon.id}`}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={async () => {
                      if (
                        !confirm(
                          `Are you sure you want to delete coupon ${coupon.id}?`
                        )
                      ) {
                        return;
                      }
                      await api.deleteCoupon({ id: coupon.id });
                      queryClient.invalidateQueries({ queryKey: ["coupons"] });
                      toast.success("Coupon deleted");
                    }}
                    className="bg-red-600 hover:bg-red-500"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button size="lg" href="/admin/coupons/create">
          Create Coupon
        </Button>
      </div>
    </div>
  );
}
