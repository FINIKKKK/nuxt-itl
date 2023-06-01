import { AxiosInstance } from 'axios';
import { LikeDto, TLikesData } from './types';

export const LikeApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TLikesData>('/likes');
    return data;
  },
  async addOrRemove(dto: LikeDto) {
    const { data } = await instance.post<LikeDto, { data: boolean }>(
      '/likes',
      dto,
    );
    return data;
  },
});
