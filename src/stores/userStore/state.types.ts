export type User = {
  id: number;
  name: string;
} | null;

export type UserState = {
  user: User;
  token: string;
};
