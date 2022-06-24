import type { DiseasesState } from "@/stores";

export type DiseasesResponse = Omit<DiseasesState, "diseases"> & {
  rows: ApiDisease[];
};

export type ApiDisease = {
  id: number;
  nome: string;
  prevencao?: string;
  tratamento: string;
};
