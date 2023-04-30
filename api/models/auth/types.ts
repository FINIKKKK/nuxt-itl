export type LoginUserDto = {
  email: string;
  password: string;
};

export type RegisterUserDto = LoginUserDto & {
  firstName: string;
  lastName: string;
};

export type TToken = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
};
