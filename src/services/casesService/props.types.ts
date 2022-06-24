import type { CasesState } from "@/stores";

export type ApiCase = {
  cidadeId?: number;
  doencaId?: number;
  id: number;
  quantidade: number;
};

export type CasesResponse = Omit<CasesState, "cases"> & {
  rows: ApiCase[];
};
