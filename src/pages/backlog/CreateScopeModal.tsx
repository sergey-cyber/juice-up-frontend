import React from "react";
import { Form, Input } from "antd";
import { EditableScope } from "../../types/entities/Backlog";
import { TrackerModal } from "../../components/TrackerModal";

interface Props {
  loading?: boolean;
  open: boolean;
  onOk: (values: EditableScope) => void;
  onCancel: () => void;
}

export const CreateScopeModal = ({ open, onCancel, onOk, loading }: Props) => {
  const [form] = Form.useForm<EditableScope>();

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
