import {TBase} from "~/api/types";
import {TUser} from "../user/types";
import {OutputBlockData} from "@editorjs/editorjs";

export type TSection = TBase & {
    title: string;
    body?: OutputBlockData[];
    user: TUser;
};

export type SectionDto = {
    title: string;
    body?: OutputBlockData[];
};

export type SectionParams = {
    company_id: number;
};
