import { TrackerModal } from "../../../components/TrackerModal";
import { Form, Input } from "antd";
import { Todo } from "../../../types/entities/Todo";
import { TextArea } from "../../../components/formElements/TextArea";

interface Props {
  loading: boolean;
  open: boolean;
  onOk: (values: Omit<Todo, "id" | "day">) => void;
  onCancel: () => void;
}

export const CreateTodoModal = ({ open, onCancel, onOk, loading }: Props) => {
  const [form] = Form.useForm<Omit<Todo, "id">>();

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
        <TextArea />
      </Form>
    </TrackerModal>
  );
};
