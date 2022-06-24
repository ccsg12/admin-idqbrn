import type { City } from "@/stores";

export type Case = {
  id: number;
  total: number;
};

export type Disease = {
  cities: City[];
  id: number;
  name: string;
  totalCases: number;
};

export type DiseasesState = {
  diseases: Disease[];
};
