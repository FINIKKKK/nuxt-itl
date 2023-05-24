import { Api } from '~/api';
import { useActiveCompanyStore } from '~/stores/ActiveCompanyStore';

/**
 * ------------------------------------------------------------
 * Глобальный middleware для проверки компании пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const activeCompanyStore = useActiveCompanyStore(); // Хранилище активной компании

  /**
   * Проверка компании ----------------
   */
  // Если пользователь находиться на страницах компании
  if (to.fullPath.includes('/companies/')) {
    // Если нет активной компании
    if (!activeCompanyStore.activeCompany) {
      // Получаем данные текущей компании
      const { data } = await Api().company.getOne(to.params.slug[0]);
      // Сохраняем в хранилище данные компании
      activeCompanyStore.setActiveCompany(data);
    }
  }
  // Если пользователь не находиться на страницах компании
  else {
    // Если установлена активная компания
    if (activeCompanyStore.activeCompany) {
      // Тогда ее обнуляем
      activeCompanyStore.setActiveCompany(null);
    }
  }
});
