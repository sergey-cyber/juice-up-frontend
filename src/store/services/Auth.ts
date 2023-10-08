import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApiUrl } from "../../../config/api";
import { withHeaders } from "../../api/utils";
import { User } from "../../types/entities/user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(
    withHeaders({
      baseUrl: baseApiUrl + "/auth"
    })
  ),
  endpoints: (builder) => ({
    whoAmI: builder.query<User, string>({
      query: () => "/who-am-i"
    })
  })
});
