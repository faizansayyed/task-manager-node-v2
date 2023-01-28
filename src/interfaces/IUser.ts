export interface IUser {
  _id: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  isEmailVerified?: boolean;
  role?: string;
}
