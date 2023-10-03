import { HomePage } from "./pages/home/HomePage";
import { CalendarPage } from "./pages/calendar/Calendar";
import { Todos } from "./pages/todos/Todos";
import { TodoPage } from "./pages/todoPage/TodoPage";
import { Backlog } from "./pages/backlog/Backlog";
import { ScopePage } from "./pages/backlog/ScopePage";
import { SimpleListPage } from "./pages/simpleList/SimpleList";
import { ListItem } from "./pages/simpleList/ListItem";
import { Login } from "./pages/login/Login";
import { HomeOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { BreadcrumbComponentProps } from "use-react-router-breadcrumbs";
import { SystemConfigContainer } from "./pages/systemConfig/SystemConfigContainer";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    breadcrumb: () => (
      <Space size={3}>
        <HomeOutlined />
        Home
      </Space>
    )
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
    breadcrumb: "Calendar"
  },
  {
    path: "/:day",
    element: <Todos />,
    breadcrumb: (props: BreadcrumbComponentProps) => (
      <>{"Todos in " + props.location.pathname.split("/")[1]}</>
    )
  },
  {
    path: "/:day/:todoId",
    element: <TodoPage />,
    breadcrumb: "Todo details"
  },
  {
    path: "/backlog",
    element: <Backlog />,
    breadcrumb: "Backlog"
  },
  {
    path: "/backlog/:scopeId",
    element: <ScopePage />,
    breadcrumb: "Todos in backlog"
  },
  {
    path: "/backlog/:scopeId/:todoId",
    element: <TodoPage />,
    breadcrumb: "Todo details"
  },
  {
    path: "/simple-list",
    element: <SimpleListPage />,
    breadcrumb: "Simple list"
  },
  {
    path: "/simple-list/:listId",
    element: <ListItem />,
    breadcrumb: "Items"
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/system-config",
    element: <SystemConfigContainer />,
    breadcrumb: "System configuration"
  },
  {
    path: "*",
    element: <h1>Not found page</h1>
  }
];

export const toHome = () => "/";
export const toCalendar = () => "/calendar";
export const toTodos = (day: string) => `/${day}`;
export const toTodoPage = (day: string, todoId: number) => `/${day}/${todoId}`;
export const toBacklog = () => "/backlog";
export const toSimpleList = () => "/simple-list";
export const toSystemConfig = () => "/system-config";
