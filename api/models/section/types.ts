import {TData, TBase} from "~/api/types";
import {TUser} from "../user/types";
import {OutputBlockData} from "@editorjs/editorjs";

export type TSectionsData = TData & {
    data: TSection[];
};
export type TSectionData = TData & {
    data: TSection;
};

export type TSection = TBase & {
    title: string;
    body?: OutputBlockData[];
    user: TUser;
};

export type SectionDto = {
    company_id: number;
    title: string;
    body?: OutputBlockData[];
    section_id?: number;
};

export type SectionParams = {
    company_id: number;
};

