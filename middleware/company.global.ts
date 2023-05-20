import {Api} from "~/api";
import {useUserStore} from "~/stores/UserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const {activeCompany, setActiveCompany} = useUserStore();

    if (to.fullPath.includes('/companies/')) {
        if (!activeCompany) {
            const {data} = await Api().company.getOne(to.params.slug);
            setActiveCompany(data)
        }
    }
});
