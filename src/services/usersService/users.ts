import { AxiosConfigApi } from "@/api";

import type { AxiosResponse } from "axios";
import type { RegisterUser, UserCredentials, UserDetails } from "@/services";

export const UsersService = {
  details: async () => {
    const response: AxiosResponse<UserDetails> = await AxiosConfigApi.api().get(
      "/users/me"
    );

    return response.data;
  },

  loginUser: async ({ email, password }: UserCredentials) => {
    const response: AxiosResponse<{ token: string }> =
      await AxiosConfigApi.api().post("/sign-in", {
        email,
        senha: password,
      });

    return response.data;
  },

  registerUser: async ({ email, password, name, role }: RegisterUser) => {
    const response = await AxiosConfigApi.api().post("/users", {
      email,
      funcaoId: role,
      nome: name,
      senha: password,
    });

    return response.data;
  },
};
