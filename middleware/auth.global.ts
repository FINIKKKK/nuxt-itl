import { parseCookies } from "nookies";
import { useUserStore } from "~/stores/UserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { setUserToken } = useUserStore();
  const router = useRouter();
  const excludedRoutes = ["/register", "/login"];
  const token = parseCookies().access_token;
  
  if (token) {
    setUserToken(token);
  }
  
  if (!token && !excludedRoutes.includes(to.fullPath)) {
    router.push("/register");
  }
});
