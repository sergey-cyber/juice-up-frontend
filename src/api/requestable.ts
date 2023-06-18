import axios from "axios";
import { api_url } from "../../config/api";

export class Requestable {
  private path;

  constructor(path = "") {
    this.path = path;
  }

  public request(method: string, url: string, payload?: object) {
    return axios({
      method: method,
      url: api_url.dev + this.path + url,
      data: payload
    }).then((response) => response.data);
  }
}
