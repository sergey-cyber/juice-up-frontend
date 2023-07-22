import axios, { AxiosError } from "axios";
import { api_url } from "../../config/api";
import { setError } from "../store/reducers/apiErrors";
import { store } from "../store/store";

export class Requestable {
  private path;

  private build_mode: keyof typeof api_url =
    //@ts-ignore
    process.env.NODE_ENV || api_url.development;

  constructor(path = "") {
    this.path = path;
  }

  public request(method: string, url: string, payload?: object) {
    const token: string | null = localStorage.getItem("token");

    return axios({
      method: method,
      url: api_url[this.build_mode] + this.path + url,
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
      .catch((err: AxiosError) =>
        store.dispatch(setError(err.response?.status))
      );
  }
}
