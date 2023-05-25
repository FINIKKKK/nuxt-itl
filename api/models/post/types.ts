import { OutputBlockData } from '@editorjs/editorjs';
import { TBase, TData } from '~/api/types';
import { TUser } from '../user/types';
import { TSection } from '~/api/models/section/types';

export type TPostsData = TData & {
  data: TPost[];
};
export type TPostData = TData & {
  data: TPost;
};

export type TPost = TBase & {
  title: string;
  body: OutputBlockData[];
  user: TUser;
  section: TSection;
  isFavorite: boolean;
  isLike: boolean;
};

export type PostDto = {
  title: string;
  body: OutputBlockData[];
  section_id: number;
};

export type PostParams = {
  section_id: number;
};
