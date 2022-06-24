import type { City } from "@/stores";

export type Disease = {
  cities: City[];
  id: number;
  name: string;
  totalCases: number;
};

export type DiseasesState = {
  diseases: Disease[];
};
