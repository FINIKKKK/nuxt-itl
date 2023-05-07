import { parseCookies } from "nookies";
import { Api } from "~/api";
import { useUserStore } from "~/stores/UserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { setUserToken } = useUserStore();
  const router = useRouter();
  const excludedRoutes = ["/register", "/login"];
  const token = parseCookies().access_token;

  if (!token && !excludedRoutes.includes(to.fullPath)) {
    router.push("/login");
  } else {
    setUserToken(token);
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
