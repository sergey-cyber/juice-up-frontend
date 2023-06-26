import {
  AppstoreAddOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  OrderedListOutlined
} from "@ant-design/icons";
import { Space } from "antd";

// eslint-disable-next-line react-refresh/only-export-components
export const ICONS = {
  backlog: <AppstoreAddOutlined />,
  todo: (isImportant?: boolean) => (
    <Space>
      <FormOutlined />
      {isImportant && (
        <ExclamationCircleOutlined style={{ color: "#ca6c00" }} />
      )}
    </Space>
  ),
  simpleList: <OrderedListOutlined />
};
