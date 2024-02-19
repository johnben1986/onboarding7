import MetadataHelper from "components/MetadataHelper";
import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import Button from "components/utils/Button";
import { useAPI } from "hooks/useAPI";
import { useRouter } from "next/router";
import useWallet from "hooks/useWallet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
export default function Coupon({ code }) {
  const { api } = useAPI();
  const { currentAddress } = useWallet();
  const {
    data: coupon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons", code],
    queryFn: () => api.getCoupon({ code }),
    enabled: !!(code && currentAddress),
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (code && coupon) {
      setValue("code", coupon.id);
      setValue("discount", coupon.discount);
      setValue("discount_type", coupon.discount_type);
      setValue(
        "usage_type",
        coupon.max_uses_per_wallet == 1 ? "once_per_wallet" : "unlimited",
      );
    }
  }, [code, coupon, setValue]);

  const queryClient = useQueryClient();

  if (!currentAddress) {
    return <div>Please connect your wallet</div>;
  }
  if (code) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Error loading coupon</div>;
    }
  }
  const onSubmit = async (data) => {
    if (code) {
      await api.updateCoupon(data);
      toast.success("Coupon updated");
    } else {
      await api.createCoupon(data);
      toast.success("Coupon created");
    }
    queryClient.invalidateQueries({ queryKey: ["coupons"] });
    router.push("/admin/coupons");
  };
  return (
    <div className="flex flex-col gap-4 text-lg">
      <h1 className="text-center text-3xl font-bold">
        {code ? "Edit" : "Create"} Coupon
      </h1>
      <div className="flex flex-col items-center gap-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-96 flex-col gap-4">
            <div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="code">Code</label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="w-48 rounded-lg border border-gray-400 px-4 py-2"
                  {...register("code", {
                    required: {
                      value: true,
                      message: "Code is required",
                    },
                  })}
                  disabled={!!code}
                  onChange={(ev) =>
                    setValue(
                      "code",
                      ev.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "")
                        .toUpperCase(),
                    )
                  }
                />
              </div>
              {errors.code && <p className="text-red-500">Code is required</p>}
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="discount">Discount</label>
                <div className="flex w-48 justify-between gap-2">
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    className="min-w-0 flex-1 rounded-lg border border-gray-400 px-4 py-2"
                    step="any"
                    {...register("discount", {
                      required: {
                        value: true,
                        message: "Discount is required",
                      },
                      min: {
                        value: 0,
                        message: "Discount must be greater than 0",
                      },
                      max: {
                        value: 100,
                        message: "Discount must be less than 100",
                      },
                    })}
                  />{" "}
                  <select
                    name="discount_type"
                    id="discount_type"
                    className="min-w-0 flex-1 rounded-lg border border-gray-400 px-4 py-2"
                    {...register("discount_type", {
                      required: {
                        value: true,
                        message: "Discount type is required",
                      },
                    })}
                    defaultValue={"percentage"}
                  >
                    <option value="percentage">%</option>
                    <option value="flat">USD</option>
                  </select>
                </div>
              </div>
              {errors.discount && (
                <p className="text-red-500">{errors.discount.message}</p>
              )}
              {errors.discount_type && (
                <p className="text-red-500">{errors.discount_type.message}</p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="usage_type">Usage</label>
                <select
                  name="usage_type"
                  id="usage_type"
                  className="w-48 min-w-0 rounded-lg border border-gray-400 px-4 py-2"
                  {...register("usage_type", {
                    required: {
                      value: true,
                      message: "Usage type is required",
                    },
                  })}
                >
                  <option value="unlimited">Unlimited</option>
                  <option value="once_per_wallet">Once per wallet</option>
                </select>
              </div>
              {errors.usage_type && (
                <p className="text-red-500">{errors.usage_type.message}</p>
              )}
            </div>
            <div className="mt-1 flex justify-center">
              <Button className="btn btn-primary w-48" size="xl">
                {code ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
