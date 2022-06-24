import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";

import type { CitiesResponse } from "./props.types";

export const CitiesService = {
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
};
