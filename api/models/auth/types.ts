import {TCompany} from "../company/types";
import {TUser} from "../user/types";
import {TData} from "~/api/types";

export type TUserToken = TData & {
    data: {
        user: TUser;
        token: TToken;
    }
};

export type TUserCompany = TData & {
    data: {
        user: TUser;
        companies: TCompany[];
    }
};

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