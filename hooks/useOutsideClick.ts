export const useOutsideClick = (
  elementRef: Ref<HTMLElement | null>,
  extraEvent?: Ref<number | null>
) => {
  const isOutside = ref(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      isOutside.value = true;
      if (extraEvent) extraEvent.value = null;
    } else {
      isOutside.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return isOutside;
};
