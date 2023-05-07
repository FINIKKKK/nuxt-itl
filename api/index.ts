import axios from "axios";
import { Context } from "@nuxt/types";
import Cookies, { parseCookies } from "nookies";
import { AuthApi } from "./models/auth";
import { CompanyApi } from "./models/company";
import { PostApi } from "./models/post";

export type ApiReturnTypes = {
  auth: ReturnType<typeof AuthApi>;
  company: ReturnType<typeof CompanyApi>;
  post: ReturnType<typeof PostApi>;
};

export const Api = (ctx?: Context): ApiReturnTypes => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.access_token;

  const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    auth: AuthApi(instance),
    company: CompanyApi(instance),
    post: PostApi(instance),
  };
};
