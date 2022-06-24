import type { City } from "@/stores";

export type Disease = ResumedDisease & {
  cities: City[];
  totalCases: number;
};

export type ResumedDisease = {
  id: number;
  name: string;
};

export type DiseasesState = {
  diseases: Disease[];
  resumedDiseases: ResumedDisease[];
};
