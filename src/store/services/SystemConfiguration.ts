import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApiUrl } from "../../../config/api";
import { SystemConfigurationType } from "../../types/entities/SystemConfiguration";
import { withHeaders } from "../../api/utils";

export const systemConfigurationApi = createApi({
  reducerPath: "systemConfigurationApi",
  baseQuery: fetchBaseQuery(
    withHeaders({
      baseUrl: baseApiUrl + "/systemConfigurations"
    })
  ),
  endpoints: (builder) => ({
    getSystemConfig: builder.query<SystemConfigurationType, string>({
      query: () => "/"
    }),
    updateSystemConfig: builder.mutation<string, SystemConfigurationType>({
      query: (config: SystemConfigurationType) => ({
        url: `/${config.id}`,
        method: "PUT",
        body: config
      })
    })
  })
});
