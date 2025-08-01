import { authApi } from "@/api/routesApi";
import { create } from "zustand";

const useDealStore = create((set) => ({
  deals: [],
  currentDeal: null,
  joinedDeals: [],
  getAllDeals: async () => {
    const res = await authApi.get("/deal");
    set({ deals: res.data.result });
  },
  getDealById: async (id) => {
    const res = await authApi.get(`/deal/${id}`);
    set({ currentDeal: res.data.result });
  },
  getJoinedDeals: async (id) => {
    const res = await authApi.get(`/deals/${id}/joiners`);
    set({ joinedDeals: res.data });
  },
  clearCurrentDeal: () => {
    set({ currentDeal: null, joinedDeals: [] })
  }
}))

export default useDealStore;