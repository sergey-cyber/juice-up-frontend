import { useState } from "react";
import { useClient } from "../../context/client";
import {
  EditableSimpleListItem,
  SimpleList,
  SimpleListItem
} from "../../types/entities/SmpleList";
import { useFetch } from "../../utils/hooks/useFetch";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Button, Form, Input, Row, Space } from "antd";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { PageHeader } from "../../components/PageHeader";
import { SavedItem } from "./components/SavedItem";
import { ICONS } from "../../components/icons/ObjectTypeIcon";
import { Events, useEvent } from "../../utils/hooks/useEvents";

export const ListItem = () => {
  const client = useClient();
  const { listId } = useParams();
  const { setEvent } = useEvent();

  const [list, setList] = useState<SimpleList>();
  const [listItems, setListItems] = useState<SimpleListItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const { loading } = useFetch(
    () => client.simpleList.get(listId || ""),
    (res) => setList(res),
    undefined,
    [listId]
  );

  const { loading: itemsLoading, reload } = useFetch(
    () => client.simpleListItem.searchByListItem(listId),
    (res) => setListItems(res),
    undefined,
    [listId]
  );

  const onSave = (values: { items: EditableSimpleListItem[] }) => {
    if (values.items.length) {
      setIsSaving(true);
      const requestValue = values.items
        .filter((el) => !!el.name)
        .map((el) => ({
          ...el,
          simpleList: Number(listId)
        }));
      client.simpleListItem
        .createItems(requestValue)
        .then(() => {
          setEvent(Events.SIMPLE_LIST_ITEMS_SAVED_SUCCESSFULY);
          reload();
        })
        .catch(() => setEvent(Events.SIMPLE_LIST_ITEMS_SAVED_FAILURE))
        .finally(() => setIsSaving(false));
    }
  };

  if (loading || itemsLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title={
          <Space align="center">
            {ICONS.simpleList}
            {list?.name}
          </Space>
        }
      />

      {listItems.map((item) => (
        <Form.Item key={item.id}>
          <SavedItem
            onDeleteFinish={() => {
              const newItems = listItems.filter((el) => el.id !== item.id);
              setListItems(newItems);
            }}
            item={item}
            onSaveFinish={(updated) => {
              const newItems = listItems.map((el) =>
                el.id === updated.id ? updated : el
              );
              setListItems(newItems);
            }}
          />
        </Form.Item>
      ))}

      <Form name="dynamic_list_items" onFinish={onSave} autoComplete="off">
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Form.Item key={key} {...restField} name={[name, "name"]}>
                  <Row justify={"space-between"} align={"middle"} wrap={false}>
                    <Input style={{ marginRight: 15 }} placeholder="Text" />
                    <DeleteOutlined onClick={() => remove(name)} />
                  </Row>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button
            loading={isSaving}
            icon={<SaveOutlined />}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
