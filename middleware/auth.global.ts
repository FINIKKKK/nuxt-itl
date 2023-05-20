import {Api} from "~/api";
import {useUserStore} from "~/stores/UserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const excludedRoutes = ["/register", "/login"];
    const router = useRouter();
    const userStore = useUserStore();
    const token = useCookie("access_token");

    if (!token.value && !excludedRoutes.includes(to.fullPath)) {
        await router.push("/login");
    } else if (token.value) {
        console.log(userStore.companies.length);
        if (!userStore.user) {
            const {data} = await Api().auth.me();
            userStore.setUser(data.user);
            userStore.setCompanies(data.companies);
        } else if (
            !userStore.companies.length &&
            to.fullPath !== "/create_company" &&
            !excludedRoutes.includes(to.fullPath)
        ) {
            await router.push("/create_company");
        }
    }
});
