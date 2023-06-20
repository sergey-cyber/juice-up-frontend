import { ArrowLeftOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { ReactNode } from "react";

interface Props {
  title: string | ReactNode;
}

export const PageHeader = ({ title }: Props) => {
  return (
    <Space style={{ marginBottom: 16 }} size={15} align="center">
      <ArrowLeftOutlined onClick={() => history.back()} />
      <Typography.Title style={{ margin: 0 }} level={5}>
        {title}
      </Typography.Title>
    </Space>
  );
};
