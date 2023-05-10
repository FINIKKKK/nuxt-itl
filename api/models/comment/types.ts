import { TBase } from "~/api/types";
import { TUser } from "../user/types";

export type TComment = TBase & {
  text: string;
  post_id?: number;
  user: TUser;
  children: TComment[];
};

export type CommentDto = {
  text: string;
  post_id?: number;
};

export type CommentParams = {
  post_id?: number;
};
