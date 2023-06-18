import { Todo } from "../../types/entities/Todo";
import { Requestable } from "../requestable";

export class Todos extends Requestable {
  constructor() {
    super("/todos");
  }

  public getList(): Promise<Todo[]> {
    return this.request("GET", "");
  }

  /**
   * @param day string in format YYYY-MM-DD. for example: 2023-05-01
   * @returns {todos} all todos for day
   */
  public getByDay(day: string): Promise<Todo[]> {
    return this.request("GET", `/by-day/${day}`);
  }

  public searchByScopeId(id?: string): Promise<Todo[]> {
    return this.request("GET", `/by-scopeId/${id}`);
  }

  public getById(id: string): Promise<Todo> {
    return this.request("GET", `/${id}`);
  }

  public create(todo: Omit<Todo, "id">) {
    return this.request("POST", "", { ...todo });
  }

  public getByMonth(date: string): Promise<Todo[]> {
    //date = yyyy:mm
    return this.request("GET", `/in-month/${date}`);
  }

  public update(todo: Todo): Promise<void> {
    return this.request("PUT", `/${todo.id}`, todo);
  }

  public delete(id: number): Promise<void> {
    return this.request("DELETE", `/${id}`);
  }
}
