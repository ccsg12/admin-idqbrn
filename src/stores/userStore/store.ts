import { defineStore } from "pinia";
import type { User, UserState } from "@/stores";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    user: null,
  }),

  getters: {
    isAuthenticated(): boolean {
      return this.user !== null;
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

    resetUserState() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      this.token = "";
      this.user = null;
    },
  },
});
