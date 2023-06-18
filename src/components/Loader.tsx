import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export const Loader = () => {
  return (
    <Spin
      className="loader"
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    />
  );
};
