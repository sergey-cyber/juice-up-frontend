import { Layout, notification } from "antd";
import { PropsWithChildren } from "react";
const { Content } = Layout;
import "./App.less";
import { Navigate, useLocation } from "react-router-dom";
import { ClientContext } from "./context/client";
import { Client } from "./api/client";
import { NotificationContext } from "./context/NotificationContext";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { BreadCrumbs } from "./components/BreadCrumbs";
import { AppHeader } from "./AppHeader";
import { AppContent } from "./AppContent";
import { authApi } from "./store/services/Auth";
import { Loader } from "./components/Loader";

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
  const location = useLocation();

  const { data: user, isLoading } = authApi.useWhoAmIQuery("");

  const errorStatus = useSelector(
    (state: RootState) => state.apiErrors.errorStatus
  );

  if (isLoading) {
    return <Loader />;
  }

  if (errorStatus === 401 && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return (
    <AppContext>
      <Layout>
        <AppHeader avatar={user?.avatar} />
        <BreadCrumbs />
        <Content className="app-content">
          <AppContent />
        </Content>
      </Layout>
    </AppContext>
  );
}
