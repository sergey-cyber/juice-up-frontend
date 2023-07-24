import { Button, Input, List, ListProps, Row } from "antd";
import { useEffect, useState } from "react";
import { Scope } from "../types/entities/Backlog";
import { Todo } from "../types/entities/Todo";
import { SimpleList } from "../types/entities/SmpleList";
import { SearchOutlined } from "@ant-design/icons";

type SerachableItem = Scope | Todo | SimpleList;

export const SearchableList = (props: ListProps<SerachableItem>) => {
  const [filteredTodos, setFilteredTodos] = useState<SerachableItem[]>(
    props.dataSource || []
  );
  const [showFilter, setShowFilter] = useState(false);

  useEffect(
    () => setFilteredTodos(props.dataSource || []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.dataSource?.length]
  );

  return (
    <List
      header={
        <Row wrap={false} justify={"space-between"}>
          {showFilter ? (
            <Input
              placeholder="IInter the name you are looking for..."
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
            />
          ) : (
            <span />
          )}
          <Button
            style={{ marginLeft: 10, width: "36px" }}
            icon={<SearchOutlined />}
            onClick={() => setShowFilter(!showFilter)}
            type={showFilter ? "primary" : "default"}
          />
        </Row>
      }
      {...props}
      dataSource={filteredTodos}
    />
  );
};
