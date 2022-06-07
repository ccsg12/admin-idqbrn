import type { Case, CityWithCases, Disease } from "@/stores";

export type State = {
  abbreviation: string;
  name: string;
};

export type MapCircleStyle = {
  color: string;
  fillColor: string;
  fillOpacity: number;
  radius: number;
};

export type CasesDetails = Case & {
  disease: string | undefined;
};

export type CityDetails = CityWithCases & {
  casesDetails: CasesDetails[];
};

export type DiseaseDetails = Omit<Disease, "cities"> & {
  cities: CityDetails[];
  totalCases: number;
};
