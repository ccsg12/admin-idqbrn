import { AxiosConfigApi } from "@/api";

export class UploadFilesService {
  upload(
    file: string | Blob,
    onUploadProgress: (event: { loaded: number; total: number }) => void
  ) {
    const formData = new FormData();
    formData.append("file", file);

    return AxiosConfigApi.api().post("/upload/csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}
