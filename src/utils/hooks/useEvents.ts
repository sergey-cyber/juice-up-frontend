import { useCallback, useMemo } from "react";
import { useNotification } from "../../context/NotificationContext";
import {
  ArgsProps,
  NotificationPlacement
} from "antd/es/notification/interface";

export enum Events {
  //Calendar
  GET_CALENDAR_DATA_ERROR,

  // Todo events
  CREATE_TODO_SUCCESSFULY,
  CREATE_TODO_FAILURE,
  DELETE_TODO_SUCCESSFULY,
  DELETE_TODO_FAILURE,
  UPDATE_TODO_SUCCESSFULY,
  UPDATE_TODO_FAILURE,

  // Scope events
  CREATE_SCOPE_SUCCESSFULY,
  CREATE_SCOPE_FAILURE,
  DELETE_SCOPE_SUCCESSFULY,
  DELETE_SCOPE_FAILURE,
  UPDATE_SCOPE_SUCCESSFULY,
  UPDATE_SCOPE_FAILURE,

  //Simple list
  CREATE_SIMPLE_LIST_SUCCESSFULY,
  CREATE_SIMPLE_LIST_FAILURE,
  DELETE_SIMPLE_LIST_SUCCESSFULY,
  DELETE_SIMPLE_LIST_FAILURE,
  UPDATE_SIMPLE_LIST_SUCCESSFULY,
  UPDATE_SIMPLE_LIST_FAILURE,

  // Simple list items
  SIMPLE_LIST_ITEMS_SAVED_SUCCESSFULY,
  SIMPLE_LIST_ITEMS_SAVED_FAILURE,

  //Auth
  REGISTRATION_SUCCESSFUY,
  REGISTRATION_FAILURE,
  LOGIN_SUCCESFULY,
  LOGIN_FAILURE
}

export const commonEventProps = {
  placement: "bottomRight" as NotificationPlacement,
  duration: 2
};

export const useEvent = () => {
  const notify = useNotification();

  const defaultProps: Partial<ArgsProps> = useMemo(() => commonEventProps, []);

  const setEvent = useCallback(
    (event: Events) => {
      switch (event) {
        //Calendar
        case Events.GET_CALENDAR_DATA_ERROR:
          notify.error({
            ...defaultProps,
            message: "Error getting calendar data"
          });
          break;

        // TODO
        case Events.CREATE_TODO_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Todo created succesfuly"
          });
          break;
        case Events.CREATE_TODO_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error creating todo"
          });
          break;
        case Events.DELETE_TODO_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Todo deleted successfuly"
          });
          break;
        case Events.DELETE_TODO_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error deleting todo"
          });
          break;
        case Events.UPDATE_TODO_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Todo updated successfuly"
          });
          break;
        case Events.UPDATE_TODO_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error uppdating todo"
          });
          break;

        // Scope
        case Events.CREATE_SCOPE_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Scope created succesfuly"
          });
          break;
        case Events.CREATE_SCOPE_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error creating scope"
          });
          break;
        case Events.DELETE_SCOPE_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Scope deleted successfuly"
          });
          break;
        case Events.DELETE_SCOPE_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error deleting scope"
          });
          break;
        case Events.UPDATE_SCOPE_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Scope updated successfuly"
          });
          break;
        case Events.UPDATE_SCOPE_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error uppdating scope"
          });
          break;

        // Simple list
        case Events.CREATE_SIMPLE_LIST_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Simple list created succesfuly"
          });
          break;
        case Events.CREATE_SIMPLE_LIST_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error creating simple list"
          });
          break;
        case Events.DELETE_SIMPLE_LIST_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Simple list deleted successfuly"
          });
          break;
        case Events.DELETE_SIMPLE_LIST_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error deleting simple list"
          });
          break;
        case Events.UPDATE_SIMPLE_LIST_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Simple list updated successfuly"
          });
          break;
        case Events.UPDATE_SIMPLE_LIST_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error uppdating simple list"
          });
          break;

        //Simple list items
        case Events.SIMPLE_LIST_ITEMS_SAVED_SUCCESSFULY:
          notify.success({
            ...defaultProps,
            message: "Items saved succesfuly"
          });
          break;
        case Events.SIMPLE_LIST_ITEMS_SAVED_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Error saving items"
          });
          break;

        //Auth
        case Events.REGISTRATION_SUCCESSFUY:
          notify.success({
            ...defaultProps,
            message: "Registration successful, please login"
          });
          break;
        case Events.REGISTRATION_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Registration failure"
          });
          break;
        case Events.LOGIN_FAILURE:
          notify.error({
            ...defaultProps,
            message: "Login failure"
          });
          break;

        default:
          return;
      }
    },
    [defaultProps, notify]
  );

  return { setEvent };
};
