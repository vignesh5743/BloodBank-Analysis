import { axiosInstance } from ".";

export const LoginUser = async (payload) => {
  const response = await axiosInstance("post", "/api/users/login", payload);
  return response;
};

export const RegisterUser = async (payload) => {
  const response = await axiosInstance("post", "/api/users/register", payload);
  return response;
};

export const GetCurrentUser = async () => {
  const response = await axiosInstance("get", "/api/users/get-current-user");
  return response;
};

export const GetAllDonarsOfAnOrganization = () => {
  return axiosInstance("get", `/api/users/get-all-donors`);
};

export const GetAllHospitalsOfAnOrganization = () => {
  return axiosInstance("get", `/api/users/get-all-hospitals`);
};

export const GetAllOrganizationsOfADonar = () => {
    return axiosInstance("get", `/api/users/get-all-organisations-of-a-donor`);
  }
  

  export const GetAllOrganizationsOfAHospital = () => {
    return axiosInstance("get", `/api/users/get-all-organisations-of-a-hospital`);
  }
  

  // export const topdonor = () => {
  //   return axiosInstance("get", `/api/users/get-top-donor`);
  // }