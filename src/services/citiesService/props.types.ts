import type { CitiesState } from "@/stores";

export type ApiCity = ApiResumedCity & {
  codigoIBGE?: number;
  latitude: number;
  longitude: number;
  populacao?: number;
};

export type ApiResumedCity = {
  id: number;
  nome: string;
  estado: string;
};

export type CitiesResponse = Omit<CitiesState, "cities"> & {
  rows: ApiCity[];
};

export type ResumedCitiesResponse = ApiResumedCity[];
