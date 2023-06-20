import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Loader = () => {
  return (
    <Spin
      className="loader"
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    />
  );
};
