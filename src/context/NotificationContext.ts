import { NotificationInstance } from "antd/es/notification/interface";
import React, { useContext } from "react";

export const NotificationContext = React.createContext<
  NotificationInstance | undefined
>(undefined);

export const useNotification = () => {
  const notify = useContext(NotificationContext);

  if (notify === undefined) {
    throw new Error("No value for ClientContext");
  }

  return notify;
};
