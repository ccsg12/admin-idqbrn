import { defineStore } from "pinia";
import type { DiseasesState } from "@/stores";

export const useDiseaseStore = defineStore("disease", {
  state: (): DiseasesState => ({
    diseases: [
      {
        id: 1,
        cases: [
          {
            id: 1,
            city: {
              id: 1,
              state: "SP",
              name: "São Paulo",
              latitude: -23.5329,
              longitude: -46.6395,
            },
            total: 300,
          },
          {
            id: 2,
            city: {
              id: 2,
              state: "RJ",
              name: "Rio de Janeiro",
              latitude: -22.9129,
              longitude: -43.2003,
            },
            total: 300,
          },
          {
            id: 3,
            city: {
              id: 3,
              state: "BA",
              name: "Salvador",
              latitude: -12.9718,
              longitude: -38.5011,
            },
            total: 300,
          },
          {
            id: 4,
            city: {
              id: 4,
              state: "CE",
              name: "Fortaleza",
              latitude: -371664,
              longitude: -38.5423,
            },
            total: 300,
          },
        ],
        totalCases: 1200,
        name: "Dengue",
      },
      {
        id: 2,
        cases: [
          {
            id: 5,
            city: {
              id: 1,
              state: "SP",
              name: "São Paulo",
              latitude: -23.5329,
              longitude: -46.6395,
            },
            total: 100,
          },
          {
            id: 6,
            city: {
              id: 2,
              state: "RJ",
              name: "Rio de Janeiro",
              latitude: -22.9129,
              longitude: -43.2003,
            },
            total: 50,
          },
          {
            id: 7,
            city: {
              id: 4,
              state: "CE",
              name: "Fortaleza",
              latitude: -371664,
              longitude: -38.5423,
            },
            total: 600,
          },
        ],
        totalCases: 750,
        name: "Gripe",
      },
      {
        id: 3,
        cases: [
          {
            id: 8,
            city: {
              id: 2,
              state: "RJ",
              name: "Rio de Janeiro",
              latitude: -22.9129,
              longitude: -43.2003,
            },
            total: 12000,
          },
          {
            id: 9,
            city: {
              id: 3,
              state: "BA",
              name: "Salvador",
              latitude: -12.9718,
              longitude: -38.5011,
            },
            total: 550,
          },
          {
            id: 10,
            city: {
              id: 4,
              state: "CE",
              name: "Fortaleza",
              latitude: -371664,
              longitude: -38.5423,
            },
            total: 120,
          },
        ],
        totalCases: 12670,
        name: "Covid 19",
      },
    ],
  }),

  // actions: {
  //  loadDiseases() {
  //
  //  }
  // }
});
