import { defineStore } from "pinia";
import type { NavBarState } from "@/stores";

export const useNavBarStore = defineStore("navBar", {
  state: (): NavBarState => ({
    showNavBar: false,
  }),

  actions: {
    setShowNavBar(value: boolean) {
      this.showNavBar = value;
    },
  },
});
