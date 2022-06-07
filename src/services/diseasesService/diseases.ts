import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";
import type { Disease } from "@/stores";

export const DiseasesApi = {
  loadDiseases: async () => {
    const response: AxiosResponse<Disease[]> = await AxiosConfigApi.api().get(
      "/diseases/cities"
    );
    return response.data;
  },
};