import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { TCompany } from '~/api/models/company/types';
import { TUser } from '~/api/models/user/types';

/**
 * --------------------------------
 * Хранилище пользователя
 * --------------------------------
 */
export const useUserStore = defineStore('userStore', () => {
  /**
   * Свойства ----------------
   */
  const user: Ref<TUser | null> = ref(null); // Пользователь
  const companies: Ref<TCompany[]> = ref([]); // Компании пользователя

  /**
   * Методы ----------------
   */
  // Установить пользователя
  const setUser = (obj: TUser) => {
    user.value = obj;
  };
  // Установить компании
  const setCompanies = (obj: TCompany[]) => {
    companies.value = obj;
  };
  // Добавить компанию
  const addCompany = (obj: TCompany) => {
    companies.value.push(obj);
  };
  // Установить аватарку пользователя
  const setUserAvatar = (avatar: string) => {
    if (user.value) {
      user.value.avatar = avatar;
    }
  };

  return {
    user,
    companies,
    setUser,
    setCompanies,
    addCompany,
    setUserAvatar,
  };
});
