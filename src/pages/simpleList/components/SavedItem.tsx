import { useState } from "react";
import { useClient } from "../../../context/client";
import { SimpleListItem } from "../../../types/entities/SmpleList";
import { Loader } from "../../../components/Loader";
import { Badge, Space, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export function SavedItem(props: {
  item: SimpleListItem;
  onSaveFinish: (updatedItem: SimpleListItem) => void;
  onDeleteFinish: () => void;
}) {
  const client = useClient();
  const [loading, setLoading] = useState(false);

  const save = (value: string) => {
    setLoading(true);
    const item = { ...props.item, name: value };
    client.simpleListItem
      .updateItem(item)
      .then(() => props.onSaveFinish(item))
      .finally(() => setLoading(false));
  };

  const deleteItem = () => {
    setLoading(true);
    client.simpleListItem
      .deleteItem(props.item.id)
      .then(() => props.onDeleteFinish())
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Space>
      <Badge color={"blue"} />
      <Typography.Text
        editable={{
          onChange: (v) => {
            save(v);
          }
        }}
      >
        {props.item.name}
      </Typography.Text>
      <DeleteOutlined onClick={deleteItem} />
    </Space>
  );
}
