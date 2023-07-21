export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  password: string;
  email?: string;
  phone?: string;
}
