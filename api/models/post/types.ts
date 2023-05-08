import { OutputBlockData } from "@editorjs/editorjs";
import { TBase } from "~/api/types";
import { TUser } from "../user/types";

export type TPost = TBase & {
  title: string;
  body: OutputBlockData[];
  user: TUser;
};

export type PostDto = {
  title: string;
  body: OutputBlockData[];
};
