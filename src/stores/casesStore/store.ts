import { defineStore } from "pinia";

import type { Case, CasesState, DetailedCase } from "@/stores";
import { useCitiesStore, useDiseaseStore } from "@/stores";
import { CasesService } from "@/services";
import { TypesHelper } from "@/helpers";

export const useCasesStore = defineStore("cases", {
  state: (): CasesState => ({
    cases: [],
    count: 0,
    next: false,
  }),

  getters: {
    detailedCases(state): DetailedCase[] {
      const citiesStore = useCitiesStore();
      const diseasesStore = useDiseaseStore();

      return state.cases.map((item) => {
        const city = citiesStore.resumedCities.find(
          ({ id }) => id === item.cityId
        );

        const disease = diseasesStore.resumedDiseases.find(
          ({ id }) => id === item.diseaseId
        );

        if (city && disease) {
          return {
            ...item,
            city: city.name,
            state: city.state,
            disease: disease.name,
          };
        }

        return {
          city: "",
          state: "",
          disease: "",
          id: 0,
          total: 0,
        };
      });
    },
  },

  actions: {
    createCase(payload: Case) {
      this.cases.push(payload);
    },

    async loadCases(page = 1, perPage = 10) {
      try {
        const response = await CasesService.loadCases(page, perPage);

        this.cases = response.rows.map((item) =>
          TypesHelper.apiCaseToCase(item)
        );
        this.next = response.next;
        this.count = response.count;
      } catch (e) {
        console.log(e);
      }
    },

    removeCase(id: number) {
      this.cases = this.cases.filter((item) => item.id !== id);
    },

    updateCase(payload: Case) {
      const index = this.cases.findIndex(({ id }) => id === payload.id);

      this.cases[index] = payload;
    },
  },
});
