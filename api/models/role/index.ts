import { AxiosInstance } from 'axios';
import { TRolesData } from './types';

export const RolesApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TRolesData>(`/roles`);
    return data;
  },
});
