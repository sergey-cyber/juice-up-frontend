import { HomePage } from "./pages/home/HomePage";
import { CalendarPage } from "./pages/calendar/Calendar";
import { Todos } from "./pages/todos/Todos";
import { TodoPage } from "./pages/todoPage/TodoPage";
import { Backlog } from "./pages/backlog/Backlog";
import { ScopePage } from "./pages/backlog/ScopePage";
import { SimpleListPage } from "./pages/simpleList/SimpleList";
import { ListItem } from "./pages/simpleList/ListItem";

export const routes = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/calendar",
    element: <CalendarPage />
  },
  {
    path: "/todos/:day",
    element: <Todos />
  },
  {
    path: "/todos/:day/:todoId",
    element: <TodoPage />
  },
  {
    path: "/backlog",
    element: <Backlog />
  },
  {
    path: "/backlog/:scopeId",
    element: <ScopePage />
  },
  {
    path: "/backlog/:scopeId/:todoId",
    element: <TodoPage />
  },
  {
    path: "simple-list",
    element: <SimpleListPage />
  },
  {
    path: "simple-list/:listId",
    element: <ListItem />
  },
  {
    path: "*",
    element: <h1>Not found page</h1>
  }
];

export const toHome = () => "/";
export const toCalendar = () => "/calendar";
export const toTodos = (day: string) => `/todos/${day}`;
export const toTodoPage = (day: string, todoId: number) =>
  `/todos/${day}/${todoId}`;
export const toBacklog = () => "/backlog";
export const toSimpleList = () => "/simple-list";
