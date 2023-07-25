import { useState } from "react";
import { useParams } from "react-router-dom";
import { useClient } from "../../context/client";
import { useFetch } from "../../utils/hooks/useFetch";
import { Todo, TodoStatus } from "../../types/entities/Todo";
import { Loader } from "../../components/Loader";
import { PageHeader } from "../../components/PageHeader";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { TextArea } from "../../components/formElements/TextArea";
import { Events, useEvent } from "../../utils/hooks/useEvents";
import { TlgNotification } from "../../types/entities/TlgNotification";
import { TlgNotificationFormItem } from "./TlgNotificationFormItem";
import { ObjectNotFound } from "../../components/ObjectNotFound";

export const TodoPage = () => {
  const client = useClient();
  const { todoId } = useParams();
  const [form] = Form.useForm<Todo>();
  const { setEvent } = useEvent();

  const [todo, setTodo] = useState<Todo>();
  const [isSaving, setIsSaving] = useState(false);
  const [tlgNotice, setTlgNotice] = useState<TlgNotification>();

  const { loading } = useFetch(
    () => client.todos.getById(todoId || ""),
    (res) => {
      setTodo(res);
      form.setFieldsValue(res);
    },
    () => console.log("error"),
    [todoId]
  );

  const { loading: tlgNoticeLoading } = useFetch(
    () => {
      if (todo?.tlgNotification) {
        return client.tlgNotification.get(todo.tlgNotification);
      }
      return Promise.resolve(undefined);
    },
    (res) => setTlgNotice(res as TlgNotification | undefined),
    () => console.log(),
    [todo?.tlgNotification]
  );

  const save = () => {
    setIsSaving(true);
    client.todos
      .update({ ...todo, ...form.getFieldsValue() })
      .then(() => {
        setEvent(Events.UPDATE_TODO_SUCCESSFULY);
        history.back();
      })
      .catch(() => setEvent(Events.UPDATE_TODO_FAILURE))
      .finally(() => setIsSaving(false));
  };

  if (loading || isSaving) {
    return <Loader />;
  }

  if (!todo) {
    return <ObjectNotFound oid={todoId} />;
  }

  return (
    <>
      <PageHeader title={todo?.name} />
      <Form form={form}>
        <Form.Item name={"name"} label="Name" required>
          <Input />
        </Form.Item>
        <TextArea />
        <Form.Item name={"status"} label="Status">
          <Select
            //style={{ width: 120 }}
            options={Object.values(TodoStatus).map((status) => ({
              value: status,
              label: status.charAt(0).toUpperCase() + status.slice(1)
            }))}
          />
        </Form.Item>
        <Form.Item valuePropName="checked" name={"isImportant"}>
          <Checkbox>Mark this todo as important</Checkbox>
        </Form.Item>
        <Form.Item label="Notification">
          {tlgNoticeLoading ? (
            <Loader />
          ) : (
            <TlgNotificationFormItem
              onCreate={(id) => setTodo({ ...todo, tlgNotification: id })}
              onDelete={() => setTodo({ ...todo, tlgNotification: undefined })}
              notifyObject={tlgNotice}
              todoId={todo?.id}
            />
          )}
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
