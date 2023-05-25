import { AxiosInstance } from 'axios';
import {
  CommentDto,
  CommentParams,
  TCommentData,
  TCommentsData,
} from './types';
import { TMessage } from '~/api/types';

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(params: CommentParams) {
    const { data } = await instance.get<TCommentsData>(
      `/comments?post_id=${params.post_id}`,
    );
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TCommentData>(`/comments/${id}`);
    return data;
  },
  async create(dto: CommentDto) {
    const { data } = await instance.post<CommentDto, { data: TCommentData }>(
      '/comments',
      dto,
    );
    return data;
  },
  async update(id: number, dto: CommentDto) {
    const { data } = await instance.patch<CommentDto, { data: TCommentData }>(
      `/comments/${id}`,
      dto,
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TMessage>(`/comments/${id}`);
    return data;
  },
});
