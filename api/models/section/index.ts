import {AxiosInstance} from "axios";
import {SectionDto, SectionParams, TSectionsData, TSectionData} from "./types";
import {TMessage} from "~/api/types";

export const SectionApi = (instance: AxiosInstance) => ({
    async getAll(params: SectionParams) {
        const {data} = await instance.get<TSectionsData>(
            `/sections?company_id=${params.company_id}`,
        );
        return data;
    },
    async getOne(id: number) {
        const {data} = await instance.get<TSectionData>(`/sections/${id}`);
        return data;
    },
    async create(dto: SectionDto) {
        const {data} = await instance.post<SectionDto, { data: TSectionData }>(
            "/sections",
            dto
        );
        return data;
    },
    async update(id: number, dto: SectionDto) {
        const {data} = await instance.patch<SectionDto, { data: TSectionData }>(
            `/sections/${id}`,
            dto
        );
        return data;
    },
    async remove(id: number) {
        const {data} = await instance.delete<TMessage>(`/sections/${id}`);
        return data;
    },
});
