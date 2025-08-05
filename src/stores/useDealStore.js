import { authApi } from "@/api/routesApi";
import { create } from "zustand";

const useDealStore = create((set) => ({
  deals: [],
  currentDeal: null,
  joinedDeals: [],
  getAllDeals: async () => {
    const res = await authApi.get("/deal");
    set({ deals: res.data.result });
    return res;
  },
  getDealById: async (id) => {
    const res = await authApi.get(`/deal/${id}`);
    set({ currentDeal: res.data.result });
    return res;
  },
  getJoinedDeals: async (id) => {
    const res = await authApi.get(`/deals/${id}/joiners`);
    set({ joinedDeals: res.data });
    return res;
  },
  clearCurrentDeal: () => {
    set({ currentDeal: null, joinedDeals: [] })
  },
  updateDealById: async (id, data) => {
  try {
    const response = await authApi.put(`/deals/${id}`, data);
    set({ currentDeal: response.data });
    return response;
  } catch (error) {
    console.error("Failed to update deal", error);
    throw error;
  }
},
}))

export default useDealStore;