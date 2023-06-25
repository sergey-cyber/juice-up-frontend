import { Popconfirm } from "antd";
import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  title?: ReactNode;
  description?: ReactNode;
  onConfirm: () => void;
}

export const PopConfirm = ({
  title,
  description,
  children,
  onConfirm
}: Props) => {
  return (
    <Popconfirm
      placement="topLeft"
      title={title || "Exactly want to delete?"}
      description={description}
      onConfirm={onConfirm}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};
