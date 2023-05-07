import { AxiosInstance } from 'axios';
import { TPost, PostDto } from './types';

export const PostApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TPost[]>('/posts');
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TPost>(`/posts/${id}`);
    return data;
  },
  async create(dto: PostDto) {
    const { data } = await instance.post<PostDto, { data: TPost }>(
      '/posts',
      dto
    );
    return data;
  },
  async update(id: number, dto: PostDto) {
    const { data } = await instance.patch<PostDto, { data: TPost }>(
      `/posts/${id}`,
      dto
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TPost>(`/posts/${id}`);
      return data;
    },
});