import { Api } from '~/api';
import { useCompanyStore } from '~/stores/CompanyStore';

/**
 * ------------------------------------------------------------
 * Глобальный middleware для проверки компании пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const companyStore = useCompanyStore(); // Хранилище активной компании

  /**
   * Проверка компании ----------------
   */
  // Если пользователь находиться на страницах компании
  if (to.fullPath.includes('/companies/')) {
    // Если нет активной компании
    if (!companyStore.activeCompany) {
      // Получаем данные текущей компании
      const { data } = await Api().company.getOne(to.params.slug);
      // Сохраняем в хранилище данные компании
      companyStore.setActiveCompany(data);
    }
  }
  // Если пользователь не находиться на страницах компании
  else {
    // Если установлена активная компания
    if (companyStore.activeCompany) {
      // Тогда ее обнуляем
      companyStore.setActiveCompany(null);
    }
  }
});
