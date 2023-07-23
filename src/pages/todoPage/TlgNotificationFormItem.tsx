import { Button, Space } from "antd";
import { TlgNotification } from "../../types/entities/TlgNotification";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import {
  TlgNoticeFormData,
  TlgNotificationModal
} from "./TlgNotificationModal";
import { useClient } from "../../context/client";
import { AxiosError } from "axios";
import { useNotification } from "../../context/NotificationContext";
import { commonEventProps } from "../../utils/hooks/useEvents";

interface Props {
  notifyObject?: TlgNotification;
  onCreate: (id: number) => void;
  todoId?: number;
}

export const TlgNotificationFormItem = ({
  notifyObject,
  onCreate,
  todoId
}: Props) => {
  const notification = useNotification();
  const client = useClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const create = useCallback(
    (data: TlgNoticeFormData) => {
      setLoading(true);
      client.tlgNotification
        .create({ ...data, todo: todoId || -1 })
        .then((res) => {
          setModalVisible(false);
          onCreate(res);
          notification.success({
            ...commonEventProps,
            message: "Notification created successfull"
          });
        })
        .catch((err?: AxiosError) =>
          notification.error({
            ...commonEventProps,
            //@ts-ignore
            message: err?.response?.data?.message,
            duration: 5
          })
        )
        .finally(() => setLoading(false));
    },
    [client.tlgNotification, notification, onCreate, todoId]
  );

  if (!notifyObject) {
    return (
      <>
        <Space direction="vertical">
          <Button onClick={() => setModalVisible(true)} icon={<PlusOutlined />}>
            Add notification
          </Button>
        </Space>
        <TlgNotificationModal
          open={modalVisible}
          onOk={(data) => create(data)}
          onCancel={() => setModalVisible(false)}
          loading={loading}
        />
      </>
    );
  }

  //TODO: add notification display and delete/update logic
  return <Space>{JSON.stringify(notifyObject)}</Space>;
};
