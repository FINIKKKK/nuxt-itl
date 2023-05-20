export const useOutsideClick = (
  elementRef: Ref<HTMLElement | null>,
  event: Ref<Boolean | null>
) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(e.target as Node)) {
      event.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
};
