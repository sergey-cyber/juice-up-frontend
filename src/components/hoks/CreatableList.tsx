import { ReactNode } from "react";
import { PageHeader } from "../PageHeader";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  children?: ReactNode | undefined;
  onAddClick: () => void;
  headerTitle: ReactNode;
}

export const CreatableList = ({ children, onAddClick, headerTitle }: Props) => {
  return (
    <>
      <PageHeader title={headerTitle} />
      {children}
      <FloatButton
        shape="circle"
        type="primary"
        style={{ left: 24, bottom: 24 }}
        icon={<PlusOutlined />}
        onClick={onAddClick}
      />
    </>
  );
};
