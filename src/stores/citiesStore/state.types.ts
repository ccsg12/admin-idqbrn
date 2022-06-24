import type { Case } from "@/stores";

export type City = ResumedCity & {
  cases: Case | undefined;
  ibgeCode?: number;
  latitude: number;
  longitude: number;
  population?: number;
};

export type ResumedCity = {
  id: number;
  name: string;
  state: string;
};

export type CitiesState = {
  cities: City[];
  count: number;
  next: boolean;
  resumedCities: ResumedCity[];
};
