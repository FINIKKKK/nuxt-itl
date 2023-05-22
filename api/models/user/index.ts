import { AxiosInstance } from 'axios';
import {
  TUserData,
  UserAvatarDto,
  UserDataDto,
  UserPasswordDto,
} from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async updateData(id: number, dto: UserDataDto) {
    const { data } = await instance.patch<UserDataDto, { data: TUserData }>(
      `/users/${id}`,
      dto,
    );
    return data;
  },
  async updatePassword(id: number, dto: UserPasswordDto) {
    const { data } = await instance.patch<UserPasswordDto, { data: TUserData }>(
      `/users/${id}`,
      dto,
    );
    return data;
  },
  async updateAvatar(id: number, dto: UserAvatarDto) {
    const { data } = await instance.patch<UserAvatarDto, { data: TUserData }>(
      `/users/${id}`,
      dto,
    );
    return data;
  },
});
