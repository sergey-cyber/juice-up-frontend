import { Layout, Row, Space, Typography } from "antd";
import { PropsWithChildren } from "react";
const { Header, Content } = Layout;
import "./App.less";
import {
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { useNavigate, useRoutes } from "react-router-dom";
import { routes, toCalendar, toHome } from "./route-config";
import { ClientContext } from "./context/client";
import { Client } from "./api/client";

const headerIconStyle = { color: "#fff", fontSize: 20 };

//@ts-ignore
console.log(process.env.NODE_ENV);

const AppContext = (props: PropsWithChildren) => {
  const client = new Client();
  return (
    <ClientContext.Provider value={client}>
      {props.children}
    </ClientContext.Provider>
  );
};

export function App() {
  const navigate = useNavigate();
  const content = useRoutes(routes);

  return (
    <AppContext>
      <Layout>
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
              <MenuOutlined style={headerIconStyle} />
              <Typography.Title level={5} style={{ color: "#fff", margin: 0 }}>
                Tracker
              </Typography.Title>
            </Space>
            <Space size={15}>
              <HomeOutlined
                onClick={() => navigate(toHome())}
                style={headerIconStyle}
              />
              <CalendarOutlined
                onClick={() => navigate(toCalendar())}
                style={headerIconStyle}
              />
            </Space>
          </Row>
        </Header>

        <Content className="app-content">{content}</Content>
      </Layout>
    </AppContext>
  );
}
