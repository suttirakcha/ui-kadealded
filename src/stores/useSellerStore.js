import { adminApi } from "@/api/routesApi";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";

const useSellerStore = create((set) => ({
    sellers: [],
    seller: null,

    fetchAllSellers: async () => {
        const token = useAuthStore.getState().accessToken;
        const res = await adminApi.get("/sellers", {
            headers: { Authorization: `Bearer ${token}` }
        });
        set({ sellers: res.data.sellers });
        return res;
    },
 
    createSeller: async (data) => {
        const token = useAuthStore.getState().accessToken;
        const res = await adminApi.post("/sellers", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });

        set((state) => ({ sellers: [...state.sellers, res.data.result] }));
        return res;
    },

    updateSeller: async (id, data) => {
        const token = useAuthStore.getState().accessToken;
        const res = await adminApi.put(`/sellers/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        set((state) => ({
            sellers: state.sellers.map((seller) =>
                seller.id === id ? res.data.sellers : seller
            )
        }));
        return res;
    },

    deleteSeller: async (id) => {
        const token = useAuthStore.getState().accessToken;
        const res = await adminApi.delete(`/sellers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        set((state) => ({
            sellers: state.sellers.filter((seller) => seller.id !== id)
        }));
        return res;
    }
}))

export default useSellerStore;