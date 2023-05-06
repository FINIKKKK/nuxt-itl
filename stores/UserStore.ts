import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const token: Ref<string | null> = ref(null);

  const setUserToken = (obj: string) => {
    token.value = obj;
  };

  return {
    token,
    setUserToken,
  };
});
