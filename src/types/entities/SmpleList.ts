export interface SimpleListItem {
  id: number;
  name: string;
  simpleList: number;
}

export interface SimpleList {
  id: number;
  name: string;
  //items: SimpleListItem[];
}

export type EditableSimpleList = Omit<SimpleList, "id">;
export type EditableSimpleListItem = Omit<SimpleListItem, "id">;
