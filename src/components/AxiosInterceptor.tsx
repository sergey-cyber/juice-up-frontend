import { AxiosError, AxiosResponse } from "axios";
import { ReactNode, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const AxiosInterceptor = ({ children }: Props) => {
  console.log("AxiosInterceptor rendered");
  const navigate = useNavigate();
  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };
    console.log("AxiosInterceptor effect");
    const errInterceptor = (error: AxiosError) => {
      if (error?.response?.status === 401) {
        navigate("/login");
      }

      return Promise.reject();
    };

    axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);

    //return () => axiosInstance.interceptors.response.eject(interceptor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
