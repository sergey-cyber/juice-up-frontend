import { Form, Input } from "antd";
import { TrackerModal } from "../../components/TrackerModal";
import { EditableSimpleList } from "../../types/entities/SmpleList";

interface Props {
  loading?: boolean;
  open: boolean;
  onOk: (values: EditableSimpleList) => void;
  onCancel: () => void;
}

export const CreateListModal = ({ loading, onCancel, onOk, open }: Props) => {
  const [form] = Form.useForm<EditableSimpleList>();

  // TODO: сделать валидацию формы

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
        <Form.Item name={"name"} label="Name" required>
          <Input />
        </Form.Item>
      </Form>
    </TrackerModal>
  );
};
