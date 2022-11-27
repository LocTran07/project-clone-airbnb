
import axios from "axios";
import { TOKEN } from "../utili/setup";
// import { TOKEN } from "../utils/setting";

export const api = axios.create();

api.interceptors.request.use((config) => {
  return {
    ...config,
    baseURL: "https://airbnbnew.cybersoft.edu.vn",
    headers: {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
      // Authorization: "Bearer " + JSON.parse(localStorage.getItem(TOKEN) || {}),
      token: JSON.parse(localStorage.getItem(TOKEN) )
    },
  };
});
