export type UserCredentials = {
  email: string;
  password: string;
};

export type RegisterUser = UserCredentials & {
  name: string;
  role: number | undefined;
};

export type UserDetails = {
  email: string;
  funcaoId: number;
  id: number;
  nome: string;
};
