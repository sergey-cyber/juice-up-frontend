export enum TodoStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
  IN_BACKLOG = "in_backlog",
  ARCHIVED = "archived"
}

export interface Todo {
  id: number;
  name: string;
  description?: string;
  day?: string; // format: YYY-MM-DD
  user: number; // user ref
  scope: number;
  status?: TodoStatus;
  isImportant?: boolean;
}
