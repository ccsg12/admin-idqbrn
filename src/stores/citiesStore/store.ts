import { defineStore } from "pinia";

import { CitiesService } from "@/services";

import type { CityState } from "@/stores";

export const useCitiesStore = defineStore("city", {
  state: (): CityState => ({
    cities: [],
  }),

  actions: {
    async loadCities() {
      try {
        if (this.cities.length === 0) {
          this.cities = await CitiesService.loadCities();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
