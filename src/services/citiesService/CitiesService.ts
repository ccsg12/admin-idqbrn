import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";
import type { CityWithCases } from "@/stores";

export const CitiesService = {
  loadCities: async () => {
    const response: AxiosResponse<CityWithCases[]> =
      await AxiosConfigApi.api().get("/cities");

    return response.data;
  },
};
