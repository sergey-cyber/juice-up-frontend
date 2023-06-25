import { Input, List, ListProps, Row } from "antd";
import { useState } from "react";
import { Scope } from "../types/entities/Backlog";
import { Todo } from "../types/entities/Todo";
import { SimpleList } from "../types/entities/SmpleList";
import { SearchOutlined } from "@ant-design/icons";

type SerachableItem = Scope | Todo | SimpleList;

export const SearchableList = (props: ListProps<SerachableItem>) => {
  const [filteredTodos, setFilteredTodos] = useState<SerachableItem[]>(
    props.dataSource || []
  );
  return (
    <List
      header={
        <Row wrap={false}>
          <Input
            onChange={(e) => {
              const { value } = e.currentTarget;
              setFilteredTodos(
                value
                  ? (props.dataSource || []).filter((at) =>
                      at.name.toLowerCase().includes(value.toLowerCase())
                    )
                  : props.dataSource || []
              );
            }}
            suffix={<SearchOutlined />}
          />
        </Row>
      }
      {...props}
      dataSource={filteredTodos}
    />
  );
};
