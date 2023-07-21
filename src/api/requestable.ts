import { api_url } from "../../config/api";
import { axiosInstance } from "./axios";

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

    return axiosInstance({
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
    }).then((response) => response.data);
  }
}
