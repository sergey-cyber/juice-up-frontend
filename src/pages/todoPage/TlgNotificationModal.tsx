import { DatePicker, Form, Row, Space } from "antd";
import { TrackerModal } from "../../components/TrackerModal";
import { useForm } from "antd/es/form/Form";
import { TlgNotification } from "../../types/entities/TlgNotification";
import { TextArea } from "../../components/formElements/TextArea";
import dayjs from "dayjs";

export type TlgNoticeFormData = Omit<TlgNotification, "id" | "recipient_id">;

interface Props {
  open: boolean;
  onOk: (data: TlgNoticeFormData) => void;
  onCancel: () => void;
  loading: boolean;
}

export const TlgNotificationModal = ({
  open,
  onOk,
  onCancel,
  loading
}: Props) => {
  const [form] = useForm<TlgNoticeFormData>();

  return (
    <TrackerModal
      afterClose={() => form.resetFields()}
      confirmLoading={loading}
      destroyOnClose
      onOk={() => onOk(form.getFieldsValue())}
      open={open}
      onCancel={onCancel}
    >
      <Form form={form}>
        <TextArea name="message" label="Notification message" />
        <Form.Item label={"Notification"} name={"executeTimestamp"}>
          <Row style={{ width: "100%" }}>
            <DatePicker
              disabledDate={(current) => {
                return (
                  dayjs().add(-1, "days") >= current ||
                  dayjs().add(1, "month") <= current
                );
              }}
              showNow={false}
              style={{ width: "100%" }}
              showTime
              showSecond={false}
              onChange={(value) =>
                form.setFieldValue("executeTimestamp", value?.toISOString())
              }
            />
          </Row>
        </Form.Item>
      </Form>
    </TrackerModal>
  );
};
