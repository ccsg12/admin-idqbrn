import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores";

import {
  CasesView,
  CitiesView,
  HomeView,
  LoginView,
  UploadView,
  UsersView,
} from "@/views";

const checkAuth = () => {
  const store = useUserStore();

  if (!store.isAuthenticated) {
    return { name: "login" };
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cases",
      name: "cases",
      component: CasesView,
      beforeEnter: checkAuth,
    },
    {
      path: "/cities",
      name: "cities",
      component: CitiesView,
      beforeEnter: checkAuth,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/upload",
      name: "upload",
      component: UploadView,
      beforeEnter: checkAuth,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
      beforeEnter: checkAuth,
    },
  ],
});

export default router;
