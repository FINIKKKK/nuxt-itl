import axios from "axios";
import { Context } from "@nuxt/types";
import Cookies, { parseCookies } from "nookies";
import { AuthApi } from "./models/auth";
import { CompanyApi } from "./models/company";
import { PostApi } from "./models/post";
import { CommentApi } from "./models/comment";
import { FilesApi } from "./models/files";

export type ApiReturnTypes = {
  auth: ReturnType<typeof AuthApi>;
  company: ReturnType<typeof CompanyApi>;
  post: ReturnType<typeof PostApi>;
  comment: ReturnType<typeof CommentApi>;
  files: ReturnType<typeof FilesApi>;
};

export const Api = (): ApiReturnTypes => {
  const token = useCookie("access_token");

  const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  return {
    auth: AuthApi(instance),
    company: CompanyApi(instance),
    post: PostApi(instance),
    comment: CommentApi(instance),
    files: FilesApi(instance),
  };
};
