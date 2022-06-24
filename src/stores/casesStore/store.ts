import { defineStore } from "pinia";

import type { Case, CasesState, DetailedCase } from "@/stores";
import { useCitiesStore } from "@/stores";
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
      const cityStore = useCitiesStore();

      return state.cases.map((item) => {
        const city = cityStore.resumedCities.find(
          ({ id }) => id === item.cityId
        );

        if (city) {
          return {
            ...item,
            city: city.name,
            state: city.state,
          };
        }
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
