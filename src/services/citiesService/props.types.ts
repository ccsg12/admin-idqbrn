import type { CitiesState, City } from "@/stores";

export type CitiesResponse = Omit<CitiesState, "cities"> & {
  rows: City[];
};
