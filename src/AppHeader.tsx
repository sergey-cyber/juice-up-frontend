import { Avatar, Drawer, Layout, Typography } from "antd";
const { Header } = Layout;
import {
  CalendarOutlined,
  MenuOutlined,
  UserOutlined
} from "@ant-design/icons";
import { toCalendar, toProfile, toSystemConfig } from "./route-config";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const headerIconStyle = { color: "#fff", fontSize: 20 };

const StyledMenuItem = styled.div`
  padding: 0.2em 0;
  font-size: 1.5em;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #ababff;
  }
  transition: all 0.5s;
`;

interface Props {
  avatar?: string;
}

export const AppHeader = ({ avatar }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Header
      className="app-header"
      style={{ position: "sticky", top: 0, zIndex: 10 }}
    >
      <div className="app-header-item">
        <MenuOutlined style={headerIconStyle} onClick={() => setOpen(true)} />
        <Typography.Title level={5} style={{ color: "#fff", margin: 0 }}>
          Tracker
        </Typography.Title>
      </div>
      <div className="app-header-item">
        <CalendarOutlined
          onClick={() => navigate(toCalendar())}
          style={headerIconStyle}
        />
        <Avatar
          onClick={() => navigate(toProfile())}
          icon={avatar ? undefined : <UserOutlined />}
          src={"avatar"}
        />
      </div>
      <Drawer
        title="Application menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ padding: 0 }}
        width={"100%"}
      >
        <StyledMenuItem>
          <NavLink onClick={() => setOpen(false)} to={toSystemConfig()}>
            Sistem configuration
          </NavLink>
        </StyledMenuItem>
      </Drawer>
    </Header>
  );
};
