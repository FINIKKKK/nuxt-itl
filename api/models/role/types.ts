import { TBase, TData } from '~/api/types';

export type TRolesData = TData & {
  data: TRole[];
};

export type TRole = TBase & {
  value: string;
};
