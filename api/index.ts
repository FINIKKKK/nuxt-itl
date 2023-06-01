import axios from 'axios';
import { AuthApi } from './models/auth';
import { CompanyApi } from './models/company';
import { PostApi } from './models/post';
import { CommentApi } from './models/comment';
import { FilesApi } from './models/files';
import { SectionApi } from '~/api/models/section';
import { UserApi } from '~/api/models/user';
import { LikeApi } from '~/api/models/like';
import { FavoriteApi } from '~/api/models/favorite';
import { RolesApi } from '~/api/models/role';

export type ApiReturnTypes = {
  auth: ReturnType<typeof AuthApi>;
  company: ReturnType<typeof CompanyApi>;
  post: ReturnType<typeof PostApi>;
  comment: ReturnType<typeof CommentApi>;
  files: ReturnType<typeof FilesApi>;
  section: ReturnType<typeof SectionApi>;
  user: ReturnType<typeof UserApi>;
  favorite: ReturnType<typeof FavoriteApi>;
  like: ReturnType<typeof LikeApi>;
  role: ReturnType<typeof RolesApi>;
};

export const Api = (): ApiReturnTypes => {
  const token = useCookie('access_token');

  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  return {
    auth: AuthApi(instance),
    company: CompanyApi(instance),
    post: PostApi(instance),
    comment: CommentApi(instance),
    files: FilesApi(instance),
    section: SectionApi(instance),
    user: UserApi(instance),
    favorite: FavoriteApi(instance),
    like: LikeApi(instance),
    role: RolesApi(instance),
  };
};
