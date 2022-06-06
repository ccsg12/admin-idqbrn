import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores";

import { AdminView, HomeView, LoginView, CadastroView } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: CadastroView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      beforeEnter: () => {
        const store = useUserStore();

        if (!store.isAuthenticated) {
          return { name: "login" };
        }
      },
    },
  ],
});

export default router;
