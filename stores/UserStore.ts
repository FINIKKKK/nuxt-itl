import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {TCompany} from "~/api/models/company/types";
import {TUser} from "~/api/models/user/types";

export const useUserStore = defineStore("userStore", () => {
    const user: Ref<TUser | null> = ref(null);
    const companies: Ref<TCompany[]> = ref([]);
    const activeCompany: Ref<TCompany | null> = ref(null);

    const setUser = (obj: TUser) => {
        user.value = obj;
    };
    const setCompany = (obj: TCompany[]) => {
        companies.value = obj;
    };
    const setActiveCompany = (obj: TCompany) => {
        activeCompany.value = obj;
    };

    return {
        user,
        companies,
        activeCompany,
        setUser,
        setCompany,
        setActiveCompany
    };
});
