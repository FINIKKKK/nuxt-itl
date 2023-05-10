import { Api } from "~/api";
import { useUserStore } from "~/stores/UserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const excludedRoutes = ["/register", "/login"];
  const router = useRouter();
  const { setUserToken } = useUserStore();
  const token = useCookie("access_token");

  if (!token.value && !excludedRoutes.includes(to.fullPath)) {
    router.push("/login");
  } else {
    token.value && setUserToken(token.value);
    if (
      to.fullPath !== "/create_company" &&
      !excludedRoutes.includes(to.fullPath)
    ) {
      try {
        await Api().company.getMine();
      } catch (err) {
        await router.push("/create_company");
      }
    }
  }
});
