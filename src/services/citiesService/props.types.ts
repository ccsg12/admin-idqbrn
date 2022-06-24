import type { CitiesState } from "@/stores";

export type CitiesResponse = Omit<CitiesState, "cities"> & {
  rows: ApiCity[];
};

export type ApiCity = {
  codigoIBGE?: number;
  id: number;
  latitude: number;
  longitude: number;
  nome: string;
  populacao?: number;
  estado: string;
};
