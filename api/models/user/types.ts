import { TBase } from "~/api/types";

export type TUser = TBase & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
