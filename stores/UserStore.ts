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
  // Обновить данные компании
  const updateCompany = (id: number, obj: TCompany) => {
    companies.value = companies.value.map((item) => {
      if (item.id === id) {
        // Обновление объекта
        return obj;
      }
      return item;
    });
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
    updateCompany,
  };
});
