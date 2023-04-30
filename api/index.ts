import axios from "axios";
import { Context } from "@nuxt/types";
import Cookies, { parseCookies } from "nookies";
import { AuthApi } from "./models/auth";

export type ApiReturnTypes = {
  auth: ReturnType<typeof AuthApi>;
};

export const Api = (ctx: Context) => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.token;

  const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    auth: AuthApi(instance),
  };
};
