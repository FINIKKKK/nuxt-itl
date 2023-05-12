import { Api } from "~/api";
import { useUserStore } from "~/stores/UserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const excludedRoutes = ["/register", "/login"];
  const router = useRouter();
  const { user, company, setUser, setCompany } = useUserStore();
  const token = useCookie("access_token");

  if (!token.value && !excludedRoutes.includes(to.fullPath)) {
    await router.push("/login");
  } else if (token.value) {
    if (!user) {
      const data = await Api().auth.me();
      setUser(data.user);
      data.company && setCompany(data.company);
    } else if (
      !company &&
      to.fullPath !== "/create_company" &&
      !excludedRoutes.includes(to.fullPath)
    ) {
      await router.push("/create_company");
    }
  }
});
