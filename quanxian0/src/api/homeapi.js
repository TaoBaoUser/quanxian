import { getRequest, postRequest } from "../utils/axios";

export const HomeApi = {
  finduser: (param) => {
    return postRequest("/users/finduser", param);
  },
  findrole: (param) => {
    return postRequest("/users/findrole", param);
  },
  adduser: (param) => {
    return postRequest("/users/adduser", param);
  },
  findalluser: (param) => {
    return getRequest("/users/findalluser", param);
  },
};
