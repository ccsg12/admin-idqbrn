import { defineStore } from "pinia";
import type { DiseasesState } from "@/stores";

import { DiseasesApi } from "@/services";

export const useDiseaseStore = defineStore("disease", {
  state: (): DiseasesState => ({
    diseases: [],
  }),

  actions: {
    async loadDiseases() {
      try {
        if (this.diseases.length === 0) {
          this.diseases = await DiseasesApi.loadDiseases();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
