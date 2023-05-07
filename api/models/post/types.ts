import { OutputBlockData } from "@editorjs/editorjs";
import { TBase } from "~/api/types";

export type TPost = TBase & {
  title: string;
  body: OutputBlockData[];
  user_id: number;
};

export type PostDto = {
  title: string;
  body: OutputBlockData[];
};
