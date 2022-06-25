export type ApiResumedDisease = {
  id: number;
  nome: string;
};

export type DiseasesResponse = {
  rows: ApiDisease[];
  next: boolean;
  count: number;
};

export type ApiDisease = ApiResumedDisease & {
  prevencao?: string;
  tratamento: string;
};
