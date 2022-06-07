import { AxiosConfigApi } from "@/api";

import type { AxiosResponse } from "axios";
import type { UserCredentials, UserDetails } from "@/services";

export const UsersService = {
  loginUser: async ({ email, password }: UserCredentials) => {
    const response: AxiosResponse<{ token: string }> =
      await AxiosConfigApi.api().post("/sign-in", {
        email,
        senha: password,
      });

    return response.data;
  },

  details: async () => {
    const response: AxiosResponse<UserDetails> = await AxiosConfigApi.api().get(
      "/users/me"
    );

    return response.data;
  },
};
