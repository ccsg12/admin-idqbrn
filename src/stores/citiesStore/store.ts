import { defineStore } from "pinia";

import type { CitiesState } from "@/stores";
import { CitiesService } from "@/services";

export const useCitiesStore = defineStore("cities", {
  state: (): CitiesState => ({
    cities: [],
    next: false,
    count: 0,
  }),

  actions: {
    async loadCities(page = 1, perPage = 20) {
      try {
        const response = await CitiesService.loadCities(page, perPage);

        this.cities = response.rows;
        this.next = response.next;
        this.count = response.count;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
