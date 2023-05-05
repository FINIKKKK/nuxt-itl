import { TBase } from "~/api/types";

export type TCompany = TBase & {
  name: string;
  url_address: string;
  user_id: number;
};

export type CompanyDto = {
  name: string;
  url_address: string;
};