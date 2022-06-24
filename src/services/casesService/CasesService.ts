import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";

import type { ApiCase, CasesResponse } from "@/services";

export const CasesService = {
  create: async (payload: ApiCase) => {
    const response: AxiosResponse<ApiCase> = await AxiosConfigApi.api().post(
      "/cases",
      payload
    );

    return response.data;
  },

  loadCases: async (page: number, perPage: number) => {
    const response: AxiosResponse<CasesResponse> =
      await AxiosConfigApi.api().get("/cases", {
        params: {
          page,
          perPage,
        },
      });

    return response.data;
  },

  update: async (payload: ApiCase) => {
    const response: AxiosResponse<ApiCase> = await AxiosConfigApi.api().put(
      "/cases",
      payload
    );

    return response.data;
  },

  remove: async (id: number) => {
    const response = await AxiosConfigApi.api().delete("/cases/" + id);

    return response.data;
  },
};
