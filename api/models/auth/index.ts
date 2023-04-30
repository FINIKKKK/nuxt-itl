import { AxiosInstance } from "axios";
import { RegisterUserDto, LoginUserDto, TToken } from "./types";

export const AuthApi = (instance: AxiosInstance) => ({
  async register(dto: RegisterUserDto) {
    const { data } = await instance.post<RegisterUserDto, { data: TToken }>(
      "/auth/register",
      dto
    );
    return data;
  },
  async login(dto: LoginUserDto) {
    const { data } = await instance.post<LoginUserDto, { data: TToken }>(
      "/auth/login",
      dto
    );
    return data;
  },
});
