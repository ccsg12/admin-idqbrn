import { AxiosConfigApi } from "@/api";
import type { AxiosResponse } from "axios";
import type { User } from "@/stores";

export const UsersApi = {
  loginUser: async (user: any) => {
    
    const response: AxiosResponse<User[]> = await AxiosConfigApi.api().post(
      "/sign-in", user
    );
    return response.data;
  },
};
