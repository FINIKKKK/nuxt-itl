import { useFormatDate } from '~/hooks/useFormatDate';

export const useDateString = (createdAt: string, updatedAt: string) => {
  if (createdAt !== updatedAt) {
    return `Обновлено: <span>${useFormatDate(updatedAt)}<span>`;
  } else {
    return `Опубликовано: <span>${useFormatDate(createdAt)}<span>`;
  }
};