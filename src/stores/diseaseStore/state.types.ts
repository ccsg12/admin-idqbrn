import type { City } from "@/stores";

export type Case = {
  id: number;
  total: number;
};

export type Disease = {
  cities: City[] | undefined;
  id: number;
  name: string;
  prevention: string;
  treatment: string;
  totalCases?: number;
};

export type DiseasesState = {
  diseases: Disease[];
  next: boolean,
  count: number,
};
