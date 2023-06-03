/**
 * Хук для получения данных
 */
export const useFetchData = (callback: any) => {
  const { data } = useAsyncData(async () => {
    try {
      // Получаем данные
      const { data } = await callback();
      return data;
    } catch (err) {
      console.log(err); // Выводим ошибки
    }
  });

  return data;
};
