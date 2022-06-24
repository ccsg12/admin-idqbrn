import { defineStore } from "pinia";

import type { DiseasesState } from "@/stores";
import { DiseasesService } from "@/services";
import { TypesHelper } from "@/helpers";

export const useDiseaseStore = defineStore("disease", {
  state: (): DiseasesState => ({
    diseases: [],
    resumedDiseases: [],
  }),

  actions: {
    async loadDiseases() {
      try {
        if (this.diseases.length === 0) {
          this.diseases = await DiseasesService.loadDiseases();
        }
      } catch (e) {
        console.log(e);
      }
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
