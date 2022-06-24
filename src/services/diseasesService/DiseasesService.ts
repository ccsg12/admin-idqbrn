import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";


import type { ApiDisease, DiseasesResponse } from "@/services";

export const DiseasesService = {
  create: async (disease: ApiDisease) => {
    const response: AxiosResponse<ApiDisease> = await AxiosConfigApi.api().post(
      "/diseases",
      disease
    );

    return response.data;
  },

  loadDiseases: async (page: number, perPage: number) => {
    const response: AxiosResponse<DiseasesResponse> =
      await AxiosConfigApi.api().get("/diseases", {
        params: {
          page,
          perPage,
        },
      });

    return response.data;
  },

  update: async (disease: ApiDisease) => {
    const response: AxiosResponse<ApiDisease> = await AxiosConfigApi.api().put(
      "/diseases",
      disease
    );

    return response.data;
  },

  remove: async (id: number) => {
    const response = await AxiosConfigApi.api().delete("/diseases/" + id);

    return response.data;
  },
};
