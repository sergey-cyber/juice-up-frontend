import { Todo, TodoStatus } from "../../types/entities/Todo";

export const isTodoCompleted = (todo: Todo) =>
  todo.status === TodoStatus.COMPLETED;

export const alphabeticalSort = <T>(arr: T[], field = "name"): T[] => [
  ...arr.sort((_a, _b) => {
    const a = _a[field as keyof T];
    const b = _b[field as keyof T];
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }
    return 0;
  })
];
