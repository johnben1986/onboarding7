export function isTesting() {
  return process.env.NEXT_PUBLIC_IS_TESTING === "true";
}
