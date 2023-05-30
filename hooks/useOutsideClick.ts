/**
 * Хук для закрытия попапа, если клик был вне его области
 */
export const useOutsideClick = (
  elementRef: Ref<HTMLElement | null>,
  event: Ref<boolean | null>,
  extraEvent?: Ref<any>,
) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(e.target as Node)) {
      // Закрытие попапа
      event.value = false;
      // Дополнительное действие
      if (extraEvent) {
        extraEvent.value = null;
      }
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
};
