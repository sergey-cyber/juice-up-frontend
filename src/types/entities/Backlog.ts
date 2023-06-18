import { Todo } from "./Todo";

export type BacklogItem = Omit<Todo, "day">;

export interface Scope {
  id: number;
  name: string;
  todos?: Todo[] | null;
}

export type EditableScope = Omit<Scope, "id" | "todos">;
