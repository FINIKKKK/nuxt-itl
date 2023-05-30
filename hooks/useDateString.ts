import { useFormatDate } from '~/hooks/useFormatDate';

/**
 * Хук для правильного отображения даты
 */
export const useDateString = (createdAt: string, updatedAt: string) => {
  // Либо дата создания
  if (createdAt !== updatedAt) {
    return `Обновлено: <span>${useFormatDate(updatedAt)}<span>`;
  }
  // Либо дата изменения
  else {
    return `Опубликовано: <span>${useFormatDate(createdAt)}<span>`;
  }
};
