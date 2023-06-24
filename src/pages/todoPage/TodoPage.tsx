import { useState } from "react";
import { useParams } from "react-router-dom";
import { useClient } from "../../context/client";
import { useFetch } from "../../utils/hooks/useFetch";
import { Todo, TodoStatus } from "../../types/entities/Todo";
import { Loader } from "../../components/Loader";
import { PageHeader } from "../../components/PageHeader";
import { Button, Form, Input, Select } from "antd";
import { Description } from "../../components/formElements/Description";

export const TodoPage = () => {
  const client = useClient();
  const { todoId } = useParams();
  const [form] = Form.useForm<Todo>();

  const [todo, setTodo] = useState<Todo>();
  const [isSaving, setIsSaving] = useState(false);

  const { loading } = useFetch(
    () => client.todos.getById(todoId || ""),
    (res) => {
      setTodo(res);
      form.setFieldsValue(res);
    },
    () => console.log("error"),
    [todoId]
  );

  const save = () => {
    setIsSaving(true);
    client.todos
      .update({ ...todo, ...form.getFieldsValue() })
      .then(() => history.back())
      .finally(() => setIsSaving(false));
  };

  if (loading || isSaving) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title={todo?.name} />
      <Form form={form}>
        <Form.Item name={"name"} label="Name" required>
          <Input />
        </Form.Item>
        <Description />
        <Form.Item name={"status"} label="Status">
          <Select
            //style={{ width: 120 }}
            options={Object.values(TodoStatus).map((status) => ({
              value: status,
              label: status.charAt(0).toUpperCase() + status.slice(1)
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={save} type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
