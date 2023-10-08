import { configureStore } from "@reduxjs/toolkit";
import { apiErrorsReducer } from "./reducers/apiErrors";
import { systemConfigurationApi } from "./services/SystemConfiguration";
import { authApi } from "./services/Auth";

export const store = configureStore({
  reducer: {
    apiErrors: apiErrorsReducer,
    [systemConfigurationApi.reducerPath]: systemConfigurationApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(systemConfigurationApi.middleware)
      .concat(authApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
