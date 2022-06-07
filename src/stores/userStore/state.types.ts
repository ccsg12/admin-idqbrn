export type User = {
  email: string;
  id: number;
  name: string;
  role: number;
} | null;

export type UserState = {
  user: User;
  token: string;
};
