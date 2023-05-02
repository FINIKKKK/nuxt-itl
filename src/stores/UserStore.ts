import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { TUser } from "~/api/models/user/types";

export const useUserStore = defineStore("userStore", () => {
  const userData: Ref<TUser | null> = ref(null);

  const setUser = (obj: TUser) => {
    userData.value = obj;
  };

  return {
    userData,
    setUser,
  };
});
