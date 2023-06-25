import { useState } from "react";
import { List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Elipsis } from "../../components/Elipsis";
import { EditableScope, Scope } from "../../types/entities/Backlog";
import { useFetch } from "../../utils/hooks/useFetch";
import { useClient } from "../../context/client";
import { Loader } from "../../components/Loader";
import { CreatableList } from "../../components/hoks/CreatableList";
import { CreateScopeModal } from "./CreateScopeModal";
import { ICONS } from "../../components/icons/ObjectTypeIcon";
import { SearchableList } from "../../components/SearchableList";
import { alphabeticalSort } from "../todos/utils";
import { Events, useEvent } from "../../utils/hooks/useEvents";
import { PopConfirm } from "../../components/PopConfirm";

export const Backlog = () => {
  const client = useClient();
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [open, setOpen] = useState(false);
  const [isCreating, setIscreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const { setEvent } = useEvent();

  const reload = () => setReloadKey(reloadKey + 1);

  const { loading } = useFetch(
    () => client.scopes.getList(),
    (res) => setScopes(alphabeticalSort(res)),
    undefined,
    [reloadKey]
  );

  const createScope = (scope: EditableScope) => {
    setIscreating(true);
    client.scopes
      .create(scope)
      .then(() => {
        setEvent(Events.CREATE_SCOPE_SUCCESSFULY);
        setOpen(false);
        reload();
      })
      .catch(() => setEvent(Events.CREATE_SCOPE_FAILURE))
      .finally(() => setIscreating(false));
  };

  const deleteScope = (id: number) => {
    setIsDeleting(true);
    client.scopes
      .delete(id)
      .then(() => {
        setEvent(Events.DELETE_SCOPE_SUCCESSFULY);
        reload();
      })
      .catch(() => setEvent(Events.DELETE_SCOPE_FAILURE))
      .finally(() => setIsDeleting(false));
  };

  if (loading || isDeleting) {
    return <Loader />;
  }

  return (
    <>
      <CreatableList headerTitle="Backlog" onAddClick={() => setOpen(true)}>
        <SearchableList
          size="small"
          bordered
          dataSource={scopes}
          renderItem={(item) => (
            <List.Item
              actions={[
                <PopConfirm onConfirm={() => deleteScope(item.id)}>
                  <DeleteOutlined style={{ color: "#408fff" }} />
                </PopConfirm>
              ]}
            >
              <List.Item.Meta
                avatar={ICONS.backlog}
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
      <CreateScopeModal
        loading={isCreating}
        open={open}
        onOk={createScope}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
