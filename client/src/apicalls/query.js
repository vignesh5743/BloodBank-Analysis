import { axiosInstance } from ".";

export const Qu1 = () => {
    return axiosInstance("get", "/api/inventory/get");
  };