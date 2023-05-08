import { AxiosInstance } from 'axios';
import { TComment, CommentDto } from './types';

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TComment[]>('/comments');
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TComment>(`/comments/${id}`);
    return data;
  },
  async create(dto: CommentDto) {
    const { data } = await instance.post<CommentDto, { data: TComment }>(
      '/comments',
      dto
    );
    return data;
  },
  async update(id: number, dto: CommentDto) {
    const { data } = await instance.patch<CommentDto, { data: TComment }>(
      `/comments/${id}`,
      dto
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TComment>(`/comments/${id}`);
      return data;
    },
});