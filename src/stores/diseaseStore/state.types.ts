import type { City } from "@/stores";

export type Disease = ResumedDisease & {
  prevention?: string;
  treatment: string;
  totalCases?: number;
};

export type DiseaseWithCities = Disease & {
  cities: City[];
};

export type ResumedDisease = {
  id: number;
  name: string;
};

export type DiseasesState = {
  diseases: Disease[];
  diseasesWithCities: DiseaseWithCities[];
  resumedDiseases: ResumedDisease[];
  next: boolean;
  count: number;
};
