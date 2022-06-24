import { defineStore } from "pinia";

import type { CitiesState, City } from "@/stores";
import { TypesHelper } from "@/helpers";
import { CitiesService } from "@/services";

export const useCitiesStore = defineStore("cities", {
  state: (): CitiesState => ({
    cities: [],
    count: 0,
    next: false,
    resumedCities: [],
  }),

  actions: {
    createCity(city: Omit<City, "cases">) {
      this.cities.push({ ...city, cases: undefined });
    },

    async loadCities(page = 1, perPage = 20) {
      try {
        const response = await CitiesService.loadCities(page, perPage);

        this.cities = response.rows.map((city) =>
          TypesHelper.apiCityToCity(city)
        );
        this.next = response.next;
        this.count = response.count;
      } catch (e) {
        console.log(e);
      }
    },

    async loadResumedCities() {
      try {
        const response = await CitiesService.loadResumedCities();

        this.resumedCities = response.map((city) =>
          TypesHelper.apiResumedCityToResumedCity(city)
        );
      } catch (e) {
        console.log(e);
      }
    },

    removeCity(id: number) {
      this.cities = this.cities.filter((city) => city.id !== id);
    },

    updateCity(city: Omit<City, "cases">) {
      const index = this.cities.findIndex(({ id }) => id === city.id);

      this.cities[index] = {
        ...city,
        cases: undefined,
      };
    },
  },
});
