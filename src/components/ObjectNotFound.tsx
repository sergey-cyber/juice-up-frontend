import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toHome } from "../route-config";

interface Props {
  oid?: number | string;
}

export const ObjectNotFound = ({ oid }: Props) => {
  const navigate = useNavigate();
  return (
    <Result
      status="warning"
      title={`Object with id ${oid} not found`}
      extra={
        <Button onClick={() => navigate(toHome())} type="primary" key="console">
          Go home
        </Button>
      }
    />
  );
};
