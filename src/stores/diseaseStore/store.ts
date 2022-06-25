import { defineStore } from "pinia";

import type { DiseasesState, Disease } from "@/stores";
import { TypesHelper } from "@/helpers";
import { DiseasesService } from "@/services";

export const useDiseaseStore = defineStore("disease", {
  state: (): DiseasesState => ({
    diseases: [],
    next: false,
    count: 0,
  }),

  actions: {
    async createDisease(disease: Omit<Disease, "cities">) {
      this.diseases.push({ ...disease, cities: undefined });
    },

    async loadDiseases(page = 1, perPage = 20) {
      try {
        const response = await DiseasesService.loadDiseases(page, perPage);

        this.diseases = response.rows.map((disease) =>
          TypesHelper.apiDiseaseToDisease(disease)
        );
        this.next = response.next;
        this.count = response.count;
      } catch (e) {
        console.log(e);
      }
    },

    updateDisease(disease: Omit<Disease, "cities">) {
      const index = this.diseases.findIndex(({ id }) => id === disease.id);

      this.diseases[index] = {
        ...disease,
        cities: undefined,
      };
    },

    removeDisease(id: number) {
      this.diseases = this.diseases.filter((disease) => disease.id !== id);
    },
    async loadDiseasesWithCities() {
        try {
          if (this.diseases.length === 0) {
            this.diseases = await DiseasesService.loadDiseasesWithCities();
          }
        } catch (e) {
          console.log(e);
        }
      }
  },
});
