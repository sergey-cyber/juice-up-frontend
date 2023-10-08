import { useRoutes } from "react-router-dom";
import { routes } from "./route-config";

export const AppContent = () => {
  const content = useRoutes(routes);

  return <>{content}</>;
};
