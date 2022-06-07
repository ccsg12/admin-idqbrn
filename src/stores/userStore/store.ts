import { defineStore } from "pinia";

import type { UserCredentials } from "@/services";
import { UsersService } from "@/services";

import type { User, UserState } from "@/stores";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    user: null,
  }),

  getters: {
    isAuthenticated(): boolean {
      return this.token !== "";
    },
  },

  actions: {
    setToken(value: string) {
      localStorage.setItem("token", value);
      this.token = value;
    },

    setUser(payload: User) {
      localStorage.setItem("user", JSON.stringify(payload));
      this.user = payload;
    },

    loadUserState() {
      const userStored = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      this.token = token ?? "";
      this.user = userStored ? JSON.parse(userStored) : null;
    },

    async login(payload: UserCredentials) {
      const response = await UsersService.loginUser(payload);

      this.setToken(response.token);
    },

    async loadUserDetails() {
      const response = await UsersService.details();

      this.setUser({
        email: response.email,
        id: response.id,
        name: response.nome,
        role: response.funcaoId,
      });
    },

    resetUserState() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      this.token = "";
      this.user = null;
    },
  },
});
