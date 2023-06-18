import { Todo, TodoStatus } from "../../types/entities/Todo";

export const isTodoCompleted = (todo: Todo) =>
  todo.status === TodoStatus.COMPLETED;
