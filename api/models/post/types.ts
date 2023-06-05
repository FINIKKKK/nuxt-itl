import { OutputBlockData } from '@editorjs/editorjs';
import { TBase, TData } from '~/api/types';
import { TUser } from '../user/types';
import { TSection } from '~/api/models/section/types';
import { TCompany } from '~/api/models/company/types';

export type TPostsData = TData & {
  data: TPost[];
};
export type TPostData = TData & {
  data: TPost;
};

export type TPost = TBase & {
  title: string;
  body: OutputBlockData[];
  user_id: number;
  author: TUser;
  section: TSection;
  isFavorite: boolean;
  isLike: boolean;
  onModeration: boolean;
  company?: TCompany;
};

export type PostDto = {
  title: string;
  body: OutputBlockData[];
  section_id: number;
};

export type PostParams = {
  section_id?: number;
  company_id?: number;
};
