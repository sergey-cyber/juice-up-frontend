import { User } from "./user";

export enum OverdueTodosPolicyActions {
  REMOVE = "REMOVE",
  RESCHEDULE = "RESCHEDULE",
  IGNORE = "IGNORE"
}

export interface SystemConfigurationType {
  id: number;
  user: User;
  overdueTodosPolicy: OverdueTodosPolicyActions;
}
