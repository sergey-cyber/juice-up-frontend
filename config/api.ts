const IP = "92.53.115.123";

type BuildMode = "development" | "production";

//@ts-ignore
const build_mode: BuildMode = process.env.NODE_ENV || api_url.development;

const api_urls: { [key in BuildMode]: string } = {
  development: "http://localhost:8099/api",
  production: `http://${IP}:8099/api`
};

export const baseApiUrl = api_urls[build_mode];
