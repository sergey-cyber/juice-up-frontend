import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useClient } from "../../context/client";
import { useFetch } from "../../utils/hooks/useFetch";
import { Todo, TodoStatus } from "../../types/entities/Todo";
import { FloatButton, List, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { CreateTodoModal } from "./component/CreateTodoModal";
import { Loader } from "../../components/Loader";
import { alphabeticalSort, isTodoCompleted } from "./utils";
import { Elipsis } from "../../components/Elipsis";
import { ICONS } from "../../components/icons/ObjectTypeIcon";
import { CompletedIcon } from "../../components/icons/CompletedIcon";
import { SearchableList } from "../../components/SearchableList";
import { Events, useEvent } from "../../utils/hooks/useEvents";
import { PopConfirm } from "../../components/PopConfirm";

export const Todos = () => {
  const params = useParams();
  const client = useClient();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeliting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const { setEvent } = useEvent();

  const reload = () => setReloadKey(reloadKey + 1);

  const { loading } = useFetch(
    () => client.todos.getByDay(params.day || ""),
    (res) => setTodos(alphabeticalSort(res)),
    undefined,
    [reloadKey]
  );

  const create = (todo: Omit<Todo, "id" | "day">) => {
    setIsCreating(true);
    client.todos
      .create({
        ...todo,
        day: params.day || "",
        status: TodoStatus.IN_PROGRESS
      })
      .then(() => {
        setEvent(Events.CREATE_TODO_SUCCESSFULY);
        setOpen(false);
        reload();
      })
      .catch(() => setEvent(Events.CREATE_TODO_FAILURE))
      .finally(() => setIsCreating(false));
  };

  const deleteTodo = (id: number) => {
    setIsDeliting(true);
    client.todos
      .delete(id)
      .then(() => {
        setEvent(Events.DELETE_TODO_SUCCESSFULY);
        reload();
      })
      .catch(() => setEvent(Events.DELETE_TODO_FAILURE))
      .finally(() => setIsDeliting(false));
  };

  if (loading || isDeleting) {
    return <Loader />;
  }

  return (
    <>
      <Typography.Title style={{ textAlign: "center", marginTop: 0 }} level={5}>
        {params.day}
      </Typography.Title>
      <SearchableList
        size="small"
        bordered
        dataSource={todos}
        // @ts-ignore
        renderItem={(item: Todo) => (
          <List.Item
            actions={[
              <PopConfirm onConfirm={() => deleteTodo(item.id)}>
                <DeleteOutlined style={{ color: "#408fff" }} />
              </PopConfirm>
            ]}
          >
            <List.Item.Meta
              avatar={
                isTodoCompleted(item) ? (
                  <CompletedIcon />
                ) : (
                  ICONS.todo(item.isImportant)
                )
              }
              title={
                <NavLink to={`./${item.id}`}>
                  <Elipsis>{item.name}</Elipsis>
                </NavLink>
              }
              description={
                item.description ? <Elipsis>{item.description}</Elipsis> : null
              }
            />
          </List.Item>
        )}
      />
      <FloatButton
        shape="circle"
        type="primary"
        style={{ left: 24, bottom: 24 }}
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      />
      <CreateTodoModal
        loading={isCreating}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={create}
      />
    </>
  );
};
