import {
  EditableSimpleListItem,
  SimpleListItem
} from "../../types/entities/SmpleList";
import { Requestable } from "../requestable";

export class SimpleListItems extends Requestable {
  constructor() {
    super("/simpleListItems");
  }

  public createItem(item: EditableSimpleListItem): Promise<number> {
    return this.request("POST", "", item);
  }

  public createItems(items: EditableSimpleListItem[]): Promise<number[]> {
    return this.request("POST", "/createItems", items);
  }

  public searchByListItem(listItemId?: string): Promise<SimpleListItem[]> {
    return this.request("GET", `/searchByListId/${listItemId}`);
  }

  public deleteItem(itemId: number): Promise<void> {
    return this.request("DELETE", `/${itemId}`);
  }

  public updateItem(item: SimpleListItem): Promise<SimpleListItem> {
    return this.request("PUT", `/${item.id}`, item);
  }
}
