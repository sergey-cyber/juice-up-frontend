import { Layout, Row, Space, Typography, notification } from "antd";
import { PropsWithChildren } from "react";
const { Header, Content } = Layout;
import "./App.less";
import { CalendarOutlined, MenuOutlined } from "@ant-design/icons";
import {
  Navigate,
  useLocation,
  useNavigate,
  useRoutes
} from "react-router-dom";
import { routes, toCalendar } from "./route-config";
import { ClientContext } from "./context/client";
import { Client } from "./api/client";
import { NotificationContext } from "./context/NotificationContext";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { BreadCrumbs } from "./components/BreadCrumbs";

const headerIconStyle = { color: "#fff", fontSize: 20 };

//@ts-ignore
console.log(process.env.NODE_ENV);

const AppContext = (props: PropsWithChildren) => {
  const client = new Client();
  const [api, contextHolder] = notification.useNotification();

  return (
    <ClientContext.Provider value={client}>
      <NotificationContext.Provider value={api}>
        {contextHolder}
        {props.children}
      </NotificationContext.Provider>
    </ClientContext.Provider>
  );
};

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const content = useRoutes(routes);

  const errorStatus = useSelector(
    (state: RootState) => state.apiErrors.errorStatus
  );

  if (errorStatus === 401 && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

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
              <CalendarOutlined
                onClick={() => navigate(toCalendar())}
                style={headerIconStyle}
              />
            </Space>
          </Row>
        </Header>
        <BreadCrumbs />
        <Content className="app-content">{content}</Content>
      </Layout>
    </AppContext>
  );
}
