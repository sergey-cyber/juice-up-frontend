import { Auth } from "./login/auth";
import { Scopes } from "./scopes/scopes";
import { SimpleList } from "./simpleList/simpleList";
import { SimpleListItems } from "./simpleList/simpleListItem";
import { TlgNotification } from "./tlgNotification/tlgNotification";
import { Todos } from "./todos/todos";

export class Client {
  public todos;
  public scopes;
  public simpleList;
  public simpleListItem;
  public auth;
  public tlgNotification;

  constructor() {
    this.todos = new Todos();
    this.scopes = new Scopes();
    this.simpleList = new SimpleList();
    this.simpleListItem = new SimpleListItems();
    this.auth = new Auth();
    this.tlgNotification = new TlgNotification();
  }
}
