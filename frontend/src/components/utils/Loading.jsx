import { Spin } from "antd";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
      }}
    >
      <Spin size="large" />
    </div>
  );
}
