import { AxiosInstance } from "axios";
import { TCompany, CompanyDto } from "./types";

export const CompanyApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TCompany[]>("/companies");
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TCompany>(`/companies/${id}`);
    return data;
  },
  async create(dto: CompanyDto) {
    const { data } = await instance.post<CompanyDto, { data: TCompany }>(
      "/companies",
      dto
    );
    return data;
  },
  async getMine() {
    const { data } = await instance.get<TCompany>(`/companies/mine`);
    return data;
  },
  async update(id: number, dto: CompanyDto) {
    const { data } = await instance.patch<CompanyDto, { data: TCompany }>(
      `/companies/${id}`,
      dto
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TCompany>(`/companies/${id}`);
    return data;
  },
});
