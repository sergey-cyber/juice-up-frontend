import { EditableScope, Scope } from "../../types/entities/Backlog";
import { Todo } from "../../types/entities/Todo";
import { Requestable } from "../requestable";

export class Scopes extends Requestable {
  constructor() {
    super("/scopes");
  }

  public getList(): Promise<Scope[]> {
    return this.request("GET", "");
  }

  public get(id: string): Promise<Scope> {
    return this.request("GET", `/${id}`);
  }

  public create(scope: EditableScope) {
    return this.request("POST", "", scope);
  }

  public delete(id: number) {
    return this.request("DELETE", `/${id}`);
  }

  public addTodo(scopeId: number, todo: Omit<Todo, "id" | "day">) {
    return this.request("POST", `/${scopeId}`, { ...todo, user_id: 2 });
  }
}
