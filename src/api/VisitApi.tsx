import  api  from "./api";
import { VisitFilters } from "../types/VisitType";

export const visitService = {
  
    async getVisits(filters?: VisitFilters) {

    const res = await api.get("/visit", {
      params: filters
    });

    return res.data;

  },
async getVisitById(id:string) {

    const res = await  api.get(`/visit/${id}`);

    return res.data;

  },
  
  async createVisit(data: {
    customerId: string;
    collectorId: string;
    currentReading: number;
    notes?: string;
  }){

    const res = await api.post("/visit", data);

    return res.data;

  },

};