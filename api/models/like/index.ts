import { AxiosInstance } from 'axios';
import { LikeDto, TLikesData } from './types';
import { TMessage } from '~/api/types';

export const LikeApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TLikesData>('/likes');
    return data;
  },
  async addOrRemove(dto: LikeDto) {
    const { data } = await instance.post<LikeDto, { data: TMessage }>(
      '/likes',
      dto,
    );
    return data;
  },
});
