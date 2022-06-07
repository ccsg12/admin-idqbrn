import axios from "axios";
class UploadFilesService {
  upload(file: string | Blob, onUploadProgress: any) {
    console.log("Aqui foi");
    let formData = new FormData();
    formData.append("file", file);
    return axios.post("http://172.21.96.1:3002/api/cases/csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }
}
export default new UploadFilesService();