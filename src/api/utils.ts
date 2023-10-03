export const withHeaders = <T>(options: T) => ({
  ...options,
  prepareHeaders: (headers: Headers) => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  }
});
