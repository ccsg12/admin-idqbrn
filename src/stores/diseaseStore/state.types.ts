import type { City } from "@/stores";

export type Case = {
  id: number;
  total: number;
};

export type CityWithCases = City & {
  cases: Case;
};

export type Disease = {
  cities: CityWithCases[];
  id: number;
  name: string;
  totalCases: number;
};

export type DiseasesState = {
  diseases: Disease[];
};
