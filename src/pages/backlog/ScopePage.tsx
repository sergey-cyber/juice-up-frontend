import { NavLink, useParams } from "react-router-dom";
import { useFetch } from "../../utils/hooks/useFetch";
import { useClient } from "../../context/client";
import { useState } from "react";
import { Scope } from "../../types/entities/Backlog";
import { Loader } from "../../components/Loader";
import { ObjectNotFound } from "../../components/ObjectNotFound";
import { DeleteOutlined } from "@ant-design/icons";
import { CreatableList } from "../../components/hoks/CreatableList";
import { Elipsis } from "../../components/Elipsis";
import { CreateTodoModal } from "../todos/component/CreateTodoModal";
import { List, Space } from "antd";
import { Todo, TodoStatus } from "../../types/entities/Todo";
import { ICONS } from "../../components/icons/ObjectTypeIcon";
import { alphabeticalSort, isTodoCompleted } from "../todos/utils";
import { CompletedIcon } from "../../components/icons/CompletedIcon";
import { SearchableList } from "../../components/SearchableList";

export const ScopePage = () => {
  const client = useClient();
  const { scopeId } = useParams();

  const [scope, setScope] = useState<Scope>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);

  const { loading: scopeLoading } = useFetch(
    () => client.scopes.get(scopeId || ""),
    (res) => setScope(res),
    undefined,
    [scopeId]
  );

  const { loading: todosLoading, reload } = useFetch(
    () => client.todos.searchByScopeId(scopeId),
    (res) => setTodos(alphabeticalSort(res)),
    undefined,
    [scopeId]
  );

  const deleteTodo = (todoId: number) => {
    client.todos.delete(todoId).then(() => reload());
  };

  const addTodo = (todo: Omit<Todo, "id" | "day">) => {
    if (scope?.id) {
      client.todos
        .create({
          ...todo,
          status: TodoStatus.IN_BACKLOG,
          scope: scope.id
        })
        .then(() => {
          setOpen(false);
          reload();
        });
    }
  };

  if (scopeLoading || todosLoading) {
    return <Loader />;
  }

  if (!scope) {
    return <ObjectNotFound oid={scopeId} />;
  }

  return (
    <>
      <CreatableList
        onAddClick={() => setOpen(true)}
        headerTitle={
          <Space>
            {ICONS.backlog}
            {scope?.name}
          </Space>
        }
      >
        <SearchableList
          size="small"
          bordered
          dataSource={todos}
          // @ts-ignore
          renderItem={(item: Todo) => (
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
              />
            </List.Item>
          )}
        />
      </CreatableList>
      {/* // TODO: можно ли менять статус если TODO в бэклоге? */}
      <CreateTodoModal
        open={open}
        onOk={addTodo}
        onCancel={() => setOpen(false)}
        loading={false}
      />
    </>
  );
};
