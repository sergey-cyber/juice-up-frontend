import { Drawer, Layout, Row, Space, Typography } from "antd";
const { Header } = Layout;
import { CalendarOutlined, MenuOutlined } from "@ant-design/icons";
import { toCalendar, toSystemConfig } from "./route-config";
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

export const AppHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Header
      className="app-header"
      style={{ position: "sticky", top: 0, zIndex: 10 }}
    >
      <Row
        align={"middle"}
        justify={"space-between"}
        style={{ height: "100%" }}
      >
        <Space size={15}>
          <MenuOutlined style={headerIconStyle} onClick={() => setOpen(true)} />
          <Typography.Title level={5} style={{ color: "#fff", margin: 0 }}>
            Tracker
          </Typography.Title>
        </Space>
        <Space size={15}>
          <CalendarOutlined
            onClick={() => navigate(toCalendar())}
            style={headerIconStyle}
          />
        </Space>
      </Row>
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
