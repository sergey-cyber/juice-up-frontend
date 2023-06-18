import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useClient } from "../../context/client";
import { useFetch } from "../../utils/hooks/useFetch";
import { Todo, TodoStatus } from "../../types/entities/Todo";
import { FloatButton, List, Typography } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { CreateTodoModal } from "./component/CreateTodoModal";
import { Loader } from "../../components/Loader";
import { isTodoCompleted } from "./utils";
import { Elipsis } from "../../components/Elipsis";
import { ICONS } from "../../components/icons/ObjectTypeIcon";

export const Todos = () => {
  const params = useParams();
  const client = useClient();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeliting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = () => setReloadKey(reloadKey + 1);

  const { loading } = useFetch(
    () => client.todos.getByDay(params.day || ""),
    (res) => setTodos(res),
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
        setOpen(false);
        reload();
      })
      .finally(() => setIsCreating(false));
  };

  const deleteTodo = (id: number) => {
    setIsDeliting(true);
    client.todos
      .delete(id)
      .then(() => reload())
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
      <List
        size="small"
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteOutlined
                onClick={() => deleteTodo(item.id)}
                style={{ color: "#408fff" }}
              />
            ]}
          >
            <List.Item.Meta
              avatar={isTodoCompleted(item) ? <CompletedIcon /> : ICONS.todo}
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

function CompletedIcon() {
  return <CheckCircleOutlined style={{ color: "green" }} />;
}
