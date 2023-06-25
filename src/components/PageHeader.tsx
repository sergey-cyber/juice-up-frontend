import { ArrowLeftOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { ReactNode } from "react";

interface Props {
  title: string | ReactNode;
  meta?: ReactNode;
}

export const PageHeader = ({ title, meta }: Props) => {
  return (
    <Space
      style={{
        marginBottom: 16,
        justifyContent: "space-between",
        width: "100%"
      }}
      size={15}
      align="center"
    >
      <Space>
        <ArrowLeftOutlined onClick={() => history.back()} />
        <Typography.Title style={{ margin: 0 }} level={5}>
          {title}
        </Typography.Title>
      </Space>
      {meta}
    </Space>
  );
};
