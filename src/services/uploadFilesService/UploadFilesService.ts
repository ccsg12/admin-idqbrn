import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";

export class UploadFilesService {
  async upload(
    file: string | Blob,
    onUploadProgress: (event: { loaded: number; total: number }) => void
  ) {
    const formData = new FormData();
    formData.append("file", file);

    const response: AxiosResponse<{ message: string }> =
      await AxiosConfigApi.api().post("/upload/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });

    return response.data;
  }
}
