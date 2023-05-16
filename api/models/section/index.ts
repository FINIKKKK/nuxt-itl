import {AxiosInstance} from "axios";
import {TSection, SectionDto, SectionParams} from "./types";

export const SectionApi = (instance: AxiosInstance) => ({
    async getAll(params: SectionParams) {
        const {data} = await instance.get<TSection[]>(
            `/sections?post_id=${params.company_id}`,
        );
        return data;
    },
    async getOne(id: number) {
        const {data} = await instance.get<TSection>(`/sections/${id}`);
        return data;
    },
    async create(dto: SectionDto) {
        const {data} = await instance.post<SectionDto, { data: TSection }>(
            "/sections",
            dto
        );
        return data;
    },
    async update(id: number, dto: SectionDto) {
        const {data} = await instance.patch<SectionDto, { data: TSection }>(
            `/sections/${id}`,
            dto
        );
        return data;
    },
    async remove(id: number) {
        const {data} = await instance.delete<TSection>(`/sections/${id}`);
        return data;
    },
});
