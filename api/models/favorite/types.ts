import { TBase, TData } from '~/api/types';
import { TPost } from '~/api/models/post/types';
import { TCompany } from '~/api/models/company/types';

export type TFavoritesData = TData & {
  data: TFavorite[];
};

export type TFavorite = TBase & {
  company: TCompany & {
    favorites: TFavoritable[];
  };
};

export type TFavoritable = {
  id: number;
  favoritable: TPost & {
    company: TCompany;
  };
};

export type FavoriteDto = {
  item_id: number;
  type: string;
};
