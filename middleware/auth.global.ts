import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';

/**
 * ------------------------------------------------------------
 * Глобальный middleware для проверки аутефикации пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const router = useRouter(); // Роутер
  const userStore = useUserStore(); // Хранилище пользователя
  const excludedRoutes = ['/register', '/login']; // Исключенные маршруты
  const token = useCookie('access_token'); // Токен

  /**
   * Проверка аутефикации пользователя ----------------
   */
  // Если нет токена
  if (!token.value && !excludedRoutes.includes(to.fullPath)) {
    // Перенаправляем пользователя на страницу регистрации
    // + При этом разрешая заходить на страницу регистрации
    await router.push('/login');
  }
  // Если есть токен
  else if (token.value) {
    // Если в хранилище нету данных пользователя
    if (!userStore.user) {
      try {
        // Получаем данные пользователя
        const { data } = await Api().auth.me();
        // Сохраняем в хранилище данные пользователя
        userStore.setUser(data.user);
        // Сохраняем в хранилище компании пользователя
        userStore.setCompanies(data.companies);
      } catch (err: any) {
        // Если токен не валидный
        // Обнуляем токен
        token.value = '';
      }
    }
  }
});
