import { TBase, TData } from '~/api/types';
import { TPost } from '~/api/models/post/types';
import { TComment } from '~/api/models/comment/types';

export type TLikesData = TData & {
  data: TLike[];
};

export type TLike = TBase & {
  likeable_id: number;
  type: string;
  likeable: TPost | TComment;
};

export type LikeDto = {
  item_id: number;
  type: string;
};
