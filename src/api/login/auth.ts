import { LoginRequest, RegisterRequest } from "../../types/auth/auth";
import { Requestable } from "../requestable";

export class Auth extends Requestable {
  constructor() {
    super("/auth");
  }
  public login(data: LoginRequest) {
    return this.request("POST", "/login", data)
      .then((res: { accessToken: string }) => {
        localStorage.setItem("token", res.accessToken);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }

  public register(data: RegisterRequest) {
    return this.request("POST", "/registration", data);
  }
}
