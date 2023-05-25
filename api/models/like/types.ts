import { TBase, TData } from '~/api/types';
import { TPost } from '~/api/models/post/types';
import { TComment } from '~/api/models/comment/types';

export type TLikesData = TData & {
  data: TLike[];
};

export type TLike = TBase & {
  liketable_id: number;
  type: string;
  liketable: TPost | TComment;
};

export type LikeDto = {
  item_id: number;
  type: string;
};
