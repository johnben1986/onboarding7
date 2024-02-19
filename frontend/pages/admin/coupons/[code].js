import Coupon from "components/Coupon";
import MetadataHelper from "components/MetadataHelper";
import { useRouter } from "next/router";

export default function CreateCoupon() {
  const router = useRouter();
  const { code } = router.query;

  return (
    <>
      <MetadataHelper noindex />
      <Coupon code={code} />
    </>
  );
}
