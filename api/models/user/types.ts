import { TBase, TData } from '@/api/types';

export type TUserData = TData & {
  data: TUser;
};

export type TUser = TBase & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserDataDto = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type UserPasswordDto = {
  old_password: string;
  password: string;
  password_confirmation: string;
};

export type UserAvatarDto = {
  avatar: any;
};
