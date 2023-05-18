import {AxiosInstance} from "axios";
import {CompanyDto, TCompaniesData, TCompanyData} from "./types";
import {TMessage} from "~/api/types";

export const CompanyApi = (instance: AxiosInstance) => ({
    async getAll() {
        const {data} = await instance.get<TCompaniesData>("/companies");
        return data;
    },
    async getOne(id: string) {
        const {data} = await instance.get<TCompanyData>(`/companies/${id}`);
        return data;
    },
    async create(dto: CompanyDto) {
        const {data} = await instance.post<CompanyDto, { data: TCompanyData }>(
            "/companies",
            dto
        );
        return data;
    },
    async update(id: number, dto: CompanyDto) {
        const {data} = await instance.patch<CompanyDto, { data: TCompanyData }>(
            `/companies/${id}`,
            dto
        );
        return data;
    },
    async remove(id: number) {
        const {data} = await instance.delete<TMessage>(`/companies/${id}`);
        return data;
    },
});
