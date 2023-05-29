import { AxiosInstance } from 'axios';
import {
  RegisterUserDto,
  LoginUserDto,
  TUserToken,
  TUserCompany,
  TLoginUserData,
} from './types';
import { TMessage } from '~/api/types';

export const AuthApi = (instance: AxiosInstance) => ({
  async register(dto: RegisterUserDto) {
    const { data } = await instance.post<RegisterUserDto, { data: TUserToken }>(
      '/auth/register',
      dto,
    );
    return data;
  },
  async login(dto: LoginUserDto) {
    const { data } = await instance.post<
      LoginUserDto,
      { data: TLoginUserData }
    >('/auth/login', dto);
    return data;
  },
  async me() {
    const { data } = await instance.get<TUserCompany>('/auth/me');
    return data;
  },
  async logout() {
    const { data } = await instance.post<TMessage>('/auth/logout');
    return data;
  },
});
