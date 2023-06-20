import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Row, Space, Typography } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  toBacklog,
  toCalendar,
  toSimpleList,
  toTodos
} from "../../route-config";
import dayjs from "dayjs";
import { FORMAT } from "../../utils/utils";
import { ICONS } from "../../components/icons/ObjectTypeIcon";

export const HomePage = () => {
  return (
    <div className="home-page">
      <Row justify="space-between">
        <Item
          link={toTodos(dayjs().format(FORMAT))}
          icon={ICONS.todo}
          caption="Todo today"
        />
        <Item
          link={toCalendar()}
          icon={<CalendarOutlined />}
          caption="To-do calendar"
        />
        <Item link={toBacklog()} icon={ICONS.backlog} caption="Backlog" />
        <Item
          link={toSimpleList()}
          icon={ICONS.simpleList}
          caption="Simple list"
        />
      </Row>
    </div>
  );
};

function Item(props: { icon: ReactNode; caption: string; link: string }) {
  const navigate = useNavigate();

  const avatarProps = {
    style: { backgroundColor: "#63a1db" },
    size: 124
  };

  return (
    <Space style={{ marginTop: 24 }} align="center" direction="vertical">
      <Avatar
        onClick={() => navigate(props.link)}
        shape="square"
        icon={props.icon}
        {...avatarProps}
      />
      <Typography.Title style={{ margin: 0 }} level={5}>
        {props.caption}
      </Typography.Title>
    </Space>
  );
}
