import { defineStore } from "pinia";

import type { Disease, DiseasesState } from "@/stores";
import { DiseasesService } from "@/services";
import { TypesHelper } from "@/helpers";

export const useDiseaseStore = defineStore("disease", {
  state: (): DiseasesState => ({
    diseasesWithCities: [],
    diseases: [],
    next: false,
    count: 0,
    resumedDiseases: [],
  }),

  actions: {
    async createDisease(disease: Disease) {
      this.diseases.push(disease);
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

    async loadDiseasesWithCities() {
      try {
        this.diseasesWithCities =
          await DiseasesService.loadDiseasesWithCities();
      } catch (e) {
        console.log(e);
      }
    },

    updateDisease(disease: Disease) {
      const index = this.diseases.findIndex(({ id }) => id === disease.id);

      this.diseases[index] = disease;
    },

    removeDisease(id: number) {
      this.diseases = this.diseases.filter((disease) => disease.id !== id);
    },

    async loadResumedDiseases() {
      try {
        const response = await DiseasesService.loadResumedDiseases();

        this.resumedDiseases = response.map((disease) =>
          TypesHelper.apiResumedDiseaseToResumedDisease(disease)
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
});
