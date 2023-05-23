import { AxiosInstance } from 'axios';
import { TUserData, UserDataDto, UserPasswordDto } from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async updateData(dto: UserDataDto) {
    const { data } = await instance.post<UserDataDto, { data: TUserData }>(
      `/users`,
      dto,
    );
    return data;
  },
  async updatePassword(dto: UserPasswordDto) {
    const { data } = await instance.patch<UserPasswordDto, { data: TUserData }>(
      `/users/password`,
      dto,
    );
    return data;
  },
  async updateAvatar(file: any) {
    const formData = new FormData();
    formData.append('avatar', file);

    const { data } = await instance.post(`/users`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
});
