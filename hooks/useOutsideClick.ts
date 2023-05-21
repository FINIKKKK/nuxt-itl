export const useOutsideClick = (
  elementRef: Ref<HTMLElement | null>,
  event: Ref<boolean | null>,
  extraEvent?: Ref<any>,
) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(e.target as Node)) {
      event.value = false;
      if (extraEvent) {
        extraEvent.value = null;
      }
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
};
