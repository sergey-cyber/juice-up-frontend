import { Loader } from "../../components/Loader";
import { systemConfigurationApi } from "../../store/services/SystemConfiguration";
import { SystemConfig } from "./SystemConfig";
import { useDispatch } from "react-redux";
import { setError } from "../../store/reducers/apiErrors";

export const SystemConfigContainer = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } =
    systemConfigurationApi.useGetSystemConfigQuery("");

  if (isLoading) {
    return <Loader />;
  }

  if (error && "status" in error) {
    dispatch(setError(error.status as number));
  }

  if (!data) {
    return <>System configuration not found</>;
  }

  return <SystemConfig initialData={data} />;
};
