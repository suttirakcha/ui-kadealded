import { adminApi, authApi } from "@/api/routesApi";
import { create } from "zustand";

const useDealStore = create((set) => ({
  deals: [],
  currentDeal: null,
  isLoading: true,
  joinedDeals: [],
  getAllDeals: async () => {
    set({ isLoading: true });
    const res = await authApi.get("/deal");
    set({ deals: res.data.result, isLoading: false });
    return res;
  },
  getDealById: async (id) => {
    set({ isLoading: true });
    const res = await authApi.get(`/deal/${id}`);
    set({ currentDeal: res.data.result, isLoading: false });
    return res;
  },
  getJoinedDeals: async (id) => {
    set({ isLoading: true });
    const res = await authApi.get(`/deals/${id}/joiners`);
    set({ joinedDeals: res.data, isLoading: false });
    return res;
  },
  clearCurrentDeal: () => {
    set({ currentDeal: null, joinedDeals: [] })
  },
  updateDealById: async (id, data) => {
  try {
    set({ isLoading: true });
    const response = await adminApi.put(`/deals/${id}`, data);
    set({ currentDeal: response.data });
    return response;
  } catch (error) {
    console.error("Failed to update deal", error);
    throw error;
  } finally {
    set({ isLoading: false });
  }
},
}))

export default useDealStore;