import { adminApi } from "@/api/routesApi";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";

const useSellerStore = create((set) => ({
    sellers: [],
    seller: null,
    isLoading: false,

    fetchAllSellers: async () => {
        // const token = useAuthStore.getState().accessToken;
        set({ loading: true });
        const token = localStorage.getItem("accessToken");
        const res = await adminApi.get("/sellers", {
            headers: { Authorization: `Bearer ${token}` }
        });
        set({ sellers: res.data.sellers, loading: false });
        return res;
    },
 
    createSeller: async (data) => {
        // const token = useAuthStore.getState().accessToken;
        set({ isLoading: true });
        const token = localStorage.getItem("accessToken");
        const res = await adminApi.post("/sellers", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });

        set((state) => ({ sellers: [...state.sellers, res.data.result], isLoading: false }));
        return res;
    },

    updateSeller: async (id, data) => {
        // const token = useAuthStore.getState().accessToken;
        set({ isLoading: true });
        const token = localStorage.getItem("accessToken");
        const res = await adminApi.put(`/sellers/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        set((state) => ({
            sellers: state.sellers.map((seller) =>
                seller.id === id ? res.data.sellers : seller
            ),
            isLoading: false
        }));
        return res;
    },

    deleteSeller: async (id) => {
        // const token = useAuthStore.getState().accessToken;
        set({ isLoading: true });
        const token = localStorage.getItem("accessToken");
        const res = await adminApi.delete(`/sellers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        set((state) => ({
            sellers: state.sellers.filter((seller) => seller.id !== id), isLoading: false
        }));
        return res;
    }
}))

export default useSellerStore;