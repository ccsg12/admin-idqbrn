export type City = {
  cases: Case[];
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  state: string;
};

export type Case = {
  id: number;
  total: number;
};

export type Disease = {
  cities: City[];
  id: number;
  name: string;
  totalCases: number;
};

export type DiseasesState = {
  diseases: Disease[];
};
