import { Navigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { systemConfigurationApi } from "../../store/services/SystemConfiguration";
import { SystemConfig } from "./SystemConfig";

export const SystemConfigContainer = () => {
  const { data, isLoading, error } =
    systemConfigurationApi.useGetSystemConfigQuery("");

  if (isLoading) {
    return <Loader />;
  }

  if (error && "status" in error && error.status === 401) {
    return <Navigate to={"/login"} />;
  }

  if (!data) {
    return <>System configuration not found</>;
  }

  return <SystemConfig initialData={data} />;
};
