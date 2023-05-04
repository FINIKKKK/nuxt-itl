export type LoginUserDto = {
  email: string;
  password: string;
};

export type RegisterUserDto = LoginUserDto & {
  firstName: string;
  lastName: string;
  password_confirmation: string;
};

export type TToken = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
};
