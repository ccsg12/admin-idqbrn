import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";

import type { ApiCity, CitiesResponse } from "@/services";

export const CitiesService = {
  create: async (city: ApiCity) => {
    const response: AxiosResponse<ApiCity> = await AxiosConfigApi.api().post(
      "/cities",
      city
    );

    return response.data;
  },

  loadCities: async (page: number, perPage: number) => {
    const response: AxiosResponse<CitiesResponse> =
      await AxiosConfigApi.api().get("/cities", {
        params: {
          page,
          perPage,
        },
      });

    return response.data;
  },

  update: async (city: ApiCity) => {
    const response: AxiosResponse<ApiCity> = await AxiosConfigApi.api().put(
      "/cities",
      city
    );

    return response.data;
  },

  remove: async (id: number) => {
    const response = await AxiosConfigApi.api().delete("/cities/" + id);

    return response.data;
  },
};
