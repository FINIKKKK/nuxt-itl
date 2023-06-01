import { AxiosInstance } from 'axios';
import { PostDto, PostParams, TPostData, TPostsData } from './types';
import { TMessage } from '~/api/types';

export const PostApi = (instance: AxiosInstance) => ({
  async getAll(params: PostParams) {
    const { data } = await instance.get<TPostsData>(
      `/posts?section_id=${params.section_id}`,
    );
    return data;
  },
  async getMine(params: PostParams) {
    const { data } = await instance.get<TPostsData>(
      `/posts/get/my?company_id=${params.company_id}`,
    );
    return data;
  },
  async getModeration(params: PostParams) {
    const { data } = await instance.get<TPostsData>(
      `/posts/get/moderation?company_id=${params.company_id}`,
    );
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TPostData>(`/posts/${id}`);
    return data;
  },
  async create(dto: PostDto) {
    const { data } = await instance.post<PostDto, { data: TPostData }>(
      '/posts',
      dto,
    );
    return data;
  },
  async update(id: number, dto: PostDto) {
    const { data } = await instance.patch<PostDto, { data: TPostData }>(
      `/posts/${id}`,
      dto,
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TMessage>(`/posts/${id}`);
    return data;
  },
});
