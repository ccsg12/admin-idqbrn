import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";

import type { Disease } from "@/stores";
import type { ApiResumedDisease } from "@/services";

export const DiseasesService = {
  loadDiseases: async () => {
    const response: AxiosResponse<Disease[]> = await AxiosConfigApi.api().get(
      "/diseases/cities"
    );
    return response.data;
  },

  loadResumedDiseases: async () => {
    const response: AxiosResponse<ApiResumedDisease[]> =
      await AxiosConfigApi.api().get("/diseases/resumed");
    return response.data;
  },
};
