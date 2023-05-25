import { TBase, TData } from '~/api/types';
import { TPost } from '~/api/models/post/types';

export type TFavoritesData = TData & {
  data: TFavorite[];
};

export type TFavorite = TBase & {
  favoritable_id: number;
  type: string;
  favoritable: TPost;
};

export type FavoriteDto = {
  item_id: number;
  type: string;
};
