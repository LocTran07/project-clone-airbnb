import { api } from "../constant/api";

export const authService = {
  login: (data) => {
    return api.post(`/api/auth/signin`, data);
  },
  signup: (data) => {
    return api.post("/api/auth/signup", data);
  },
};
