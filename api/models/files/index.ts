import { AxiosInstance } from "axios";

export const FilesApi = (instance: AxiosInstance) => ({
  async upload(file: any) {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await instance.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
});
