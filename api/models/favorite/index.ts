import { AxiosInstance } from 'axios';
import { FavoriteDto, TFavoritesData } from './types';
import { TMessage } from '~/api/types';

export const FavoriteApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TFavoritesData>('/favorites');
    return data;
  },
  async addOrRemove(dto: FavoriteDto) {
    const { data } = await instance.post<FavoriteDto, { data: TMessage }>(
      '/favorites',
      dto,
    );
    return data;
  },
});
