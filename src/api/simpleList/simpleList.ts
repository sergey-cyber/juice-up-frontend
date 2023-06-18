import {
  EditableSimpleList,
  SimpleList as SimpleListType
} from "../../types/entities/SmpleList";
import { Requestable } from "../requestable";

export class SimpleList extends Requestable {
  constructor() {
    super("/simpleLists");
  }

  public getList(): Promise<SimpleListType[]> {
    return this.request("GET", "");
  }

  public get(id: string): Promise<SimpleListType> {
    return this.request("GET", `/${id}`);
  }

  public delete(id: number): Promise<void> {
    return this.request("DELETE", `/${id}`);
  }

  public create(list: EditableSimpleList): Promise<void> {
    return this.request("POST", "", list);
  }
}
