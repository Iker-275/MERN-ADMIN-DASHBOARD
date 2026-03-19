import  api  from "./api";
import { DashboardResponse } from "../types/DashboardType";



export const dashboardService = {

  async getDashboard(): Promise<DashboardResponse> {

    const res = await api.get("/dashboard");

    return res.data;

  },
};