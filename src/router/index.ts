import { createRouter, createWebHistory } from "vue-router";
import { HomeView } from "@/views/home";
import { LoginView } from "@/views/login";
import { RegisterDiseaseView } from "@/views/registerDisease";

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
      path: "/admin",
      name: "admin",
      component: RegisterDiseaseView,
    },
  ],
});

export default router;
