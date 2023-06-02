import { TBase, TData } from '~/api/types';
import { TUser } from '../user/types';
import { OutputBlockData } from '@editorjs/editorjs';
import { TPost } from '~/api/models/post/types';

export type TSectionsData = TData & {
  data: TSection[];
};
export type TSectionData = TData & {
  data: TSection;
};

export type TSection = TBase & {
  title: string;
  body?: OutputBlockData[];
  author: TUser;
  parentSection?: TSection;
  data: {
    sections?: TSection[];
    posts?: TPost[];
  };
};

export type SectionDto = {
  company_id: number;
  title: string;
  body?: OutputBlockData[];
  section_id?: number;
};

export type SectionParams = {
  company_id: number;
  isParents?: boolean;
};
