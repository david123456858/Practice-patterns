export interface UserBase {
  idUser: string;
  name: string;
  lastName: string;
  email: string;
}

export interface User extends UserBase {
  role?: string;
}

export interface RegisterUserData extends Pick<UserBase, "idUser" | "name" | "lastName" | "email"> {
  password: string;
  password2: string;
}

export interface AuthenticatedUser {
  userId: string;
  userEmail: string;
  userName: string;
  role: string;
}
