import axios from "axios";
import { api_url } from "../../config/api";

export class Requestable {
  private path;

  private build_mode: keyof typeof api_url =
    //@ts-ignore
    process.env.NODE_ENV || api_url.development;

  constructor(path = "") {
    this.path = path;
  }

  public request(method: string, url: string, payload?: object) {
    return axios({
      method: method,
      url: api_url[this.build_mode] + this.path + url,
      data: payload
    }).then((response) => response.data);
  }
}
