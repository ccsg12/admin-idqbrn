export type Case = {
  cityId?: number;
  diseaseId?: number;
  id: number;
  total: number;
};

export type DetailedCase =
  | (Case & {
      city: string;
      state: string;
      disease: string;
    })
  | undefined;

export type CasesState = {
  cases: Case[];
  count: number;
  next: boolean;
};
