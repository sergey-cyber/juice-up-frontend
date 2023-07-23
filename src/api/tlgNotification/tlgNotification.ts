import { TlgNoticeFormData } from "../../pages/todoPage/TlgNotificationModal";
import { Requestable } from "../requestable";

export class TlgNotification extends Requestable {
  constructor() {
    super("/tlgNotifications");
  }

  public get(id: number): Promise<TlgNotification> {
    return this.request("GET", `/${id}`);
  }

  public create(data: TlgNoticeFormData): Promise<number> {
    return this.request("POST", "", data);
  }

  public update(
    data: Omit<TlgNotification, "id" | "recipient_id">,
    id: number
  ): Promise<void> {
    return this.request("PUT", `/${id}`, data);
  }

  public delete(id: number) {
    return this.request("DELETE", `/${id}`);
  }
}
