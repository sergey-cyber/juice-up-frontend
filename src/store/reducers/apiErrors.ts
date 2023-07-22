import { AnyAction } from "@reduxjs/toolkit";

const SET_ERROR = "SET_ERROR";

export interface State {
  errorStatus: number | null;
}

const initialState: State = {
  errorStatus: null
};

export const apiErrorsReducer = (
  state = initialState,
  action: AnyAction
): State => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errorStatus: action.payload
      };
    default:
      return state;
  }
};

// Actions
export const setError = (error?: number | null) => {
  return { type: SET_ERROR, payload: error };
};
