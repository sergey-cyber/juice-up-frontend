import axios, { AxiosError } from "axios";
import { baseApiUrl } from "../../config/api";
import { setError } from "../store/reducers/apiErrors";
import { store } from "../store/store";

export class Requestable {
  private path;

  constructor(path = "") {
    this.path = path;
  }

  public request(method: string, url: string, payload?: object) {
    const token: string | null = localStorage.getItem("token");

    return axios({
      method: method,
      url: baseApiUrl + this.path + url,
      data: payload,
      ...(token
        ? {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        : {})
    })
      .then((response) => {
        store.dispatch(setError(null));
        return response.data;
      })
      .catch((err?: AxiosError) => {
        store.dispatch(setError(err?.response?.status));
        throw new AxiosError(
          err?.message,
          undefined,
          undefined,
          undefined,
          err?.response
        );
      });
  }
}
