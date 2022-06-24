import { defineStore } from "pinia";

import type { DiseasesState } from "@/stores";
import { DiseasesService } from "@/services";

export const useDiseaseStore = defineStore("disease", {
  state: (): DiseasesState => ({
    diseases: [],
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
  },
});
