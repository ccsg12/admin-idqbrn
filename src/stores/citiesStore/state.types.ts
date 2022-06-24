import type { Case } from "@/stores";

export type City = {
  cases: Case | undefined;
  ibgeCode?: number;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population?: number;
  state: string;
};

export type CitiesState = {
  count: number;
  next: boolean;
  cities: City[];
};
