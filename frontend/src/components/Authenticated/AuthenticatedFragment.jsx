import useWallet from "hooks/useWallet";

export default function AuthenticatedFragment({
  children,
  permission,
  owner,
  placeholder,
  role,
}) {
  const { user, currentAddress } = useWallet();

  return (
    <>
      {currentAddress &&
      (user.permissions[permission] ||
        (owner === currentAddress && user.permissions[permission + ".owned"]) ||
        user.role == role)
        ? children
        : placeholder}
    </>
  );
}
