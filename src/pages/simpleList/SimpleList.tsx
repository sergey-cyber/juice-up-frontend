import { List } from "antd";
import { CreatableList } from "../../components/hoks/CreatableList";
import { useState } from "react";
import { useClient } from "../../context/client";
import { EditableSimpleList, SimpleList } from "../../types/entities/SmpleList";
import { useFetch } from "../../utils/hooks/useFetch";
import { Loader } from "../../components/Loader";
import { DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Elipsis } from "../../components/Elipsis";
import { ICONS } from "../../components/icons/ObjectTypeIcon";
import { CreateListModal } from "./CreacteListModal";

export const SimpleListPage = () => {
  const client = useClient();

  const [lists, setList] = useState<SimpleList[]>([]);
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeliting] = useState(false);

  const { loading, reload } = useFetch(
    () => client.simpleList.getList(),
    (res) => setList(res)
  );

  const deleteItem = (id: number) => {
    setIsDeliting(true);
    client.simpleList
      .delete(id)
      .then(() => reload())
      .finally(() => setIsDeliting(false));
  };

  const createList = (value: EditableSimpleList) => {
    setIsCreating(true);
    client.simpleList
      .create(value)
      .then(() => {
        reload();
        setOpen(false);
      })
      .finally(() => setIsCreating(false));
  };

  if (loading || isDeleting) {
    return <Loader />;
  }

  return (
    <>
      <CreatableList
        onAddClick={() => setOpen(true)}
        headerTitle={"Simple lists"}
      >
        <List
          size="small"
          bordered
          dataSource={lists}
          renderItem={(list) => (
            <List.Item
              actions={[
                <DeleteOutlined
                  onClick={() => deleteItem(list.id)}
                  style={{ color: "#408fff" }}
                />
              ]}
            >
              <List.Item.Meta
                avatar={ICONS.simpleList}
                title={
                  <NavLink to={`./${list.id}`}>
                    <Elipsis>{list.name}</Elipsis>
                  </NavLink>
                }
              />
            </List.Item>
          )}
        />
      </CreatableList>
      <CreateListModal
        open={open}
        loading={isCreating}
        onCancel={() => setOpen(false)}
        onOk={createList}
      />
    </>
  );
};
