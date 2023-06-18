import React, { useContext } from "react";
import { Client } from "../api/client";

export const ClientContext = React.createContext<Client | undefined>(undefined);

export const useClient = () => {
  const client = useContext(ClientContext);

  if (client === undefined) {
    throw new Error("No value for ClientContext");
  }

  return client;
};
