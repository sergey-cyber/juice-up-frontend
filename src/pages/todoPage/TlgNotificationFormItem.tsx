import { Button, Col, Input, Row, Space } from "antd";
import { TlgNotification } from "../../types/entities/TlgNotification";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import {
  TlgNoticeFormData,
  TlgNotificationModal
} from "./TlgNotificationModal";
import { useClient } from "../../context/client";
import { AxiosError } from "axios";
import { useNotification } from "../../context/NotificationContext";
import { commonEventProps } from "../../utils/hooks/useEvents";
import dayjs from "dayjs";

interface Props {
  notifyObject?: TlgNotification;
  onCreate: (id: number) => void;
  onDelete: () => void;
  todoId?: number;
}

export const TlgNotificationFormItem = ({
  notifyObject,
  onCreate,
  onDelete,
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

  const remove = useCallback(() => {
    setLoading(true);
    client.tlgNotification
      .delete(notifyObject?.id || -1)
      .then(() => {
        notification.success({
          ...commonEventProps,
          message: "Notification removed succesfull"
        });
        onDelete();
      })
      .catch((err) => {
        notification.error({
          ...commonEventProps,
          //@ts-ignore
          message: err?.response?.data?.message,
          duration: 5
        });
      })
      .finally(() => setLoading(false));
  }, [client.tlgNotification, notification, notifyObject?.id, onDelete]);

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
  return (
    <Row justify={"space-between"} wrap={false} gutter={[10, 10]}>
      <Col flex="auto">
        <Input
          readOnly
          value={dayjs(notifyObject.executeTimestamp).format(
            "YYYY-MM-DD in HH:mm"
          )}
        />
      </Col>
      <Col>
        <Button icon={<EditOutlined />} />
      </Col>
      <Col>
        <Button danger icon={<DeleteOutlined />} onClick={remove} />
      </Col>
    </Row>
  );
};
