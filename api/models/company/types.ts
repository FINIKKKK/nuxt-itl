import { TBase, TData } from '~/api/types';

export type TCompaniesData = TData & {
  data: TCompany[];
};
export type TCompanyData = TData & {
  data: TCompany;
};

export type TCompany = TBase & {
  name: string;
  url_address: string;
  slug: string;
  user_id: number;
  users_count: number;
};

export type CompanyDto = {
  name: string;
  url_address: string;
};

export type CompanyParams = {
  section_id: number;
};
