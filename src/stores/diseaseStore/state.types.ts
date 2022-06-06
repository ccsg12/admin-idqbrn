export type City = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  state: string;
};

export type DiseaseCase = {
  city: City;
  id: number;
  total: number;
};

export type Disease = {
  cases: DiseaseCase[];
  id: number;
  name: string;
  totalCases: number;
};

export type DiseasesState = {
  diseases: Disease[];
};
