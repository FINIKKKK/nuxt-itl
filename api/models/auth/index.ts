import {AxiosInstance} from "axios";
import {RegisterUserDto, LoginUserDto, TUserToken, TUserCompany} from "./types";

export const AuthApi = (instance: AxiosInstance) => ({
    async register(dto: RegisterUserDto) {
        const {data} = await instance.post<RegisterUserDto, { data: TUserToken }>(
            "/auth/register",
            dto
        );
        return data;
    },
    async login(dto: LoginUserDto) {
        const {data} = await instance.post<LoginUserDto, { data: TUserToken }>(
            "/auth/login",
            dto
        );
        return data;
    },
    async me() {
        const {data} = await instance.get<TUserCompany>(
            "/auth/me",
        );
        return data;
    },
});
