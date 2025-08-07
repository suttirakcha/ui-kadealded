import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import { adminApi, authApi } from "@/api/routesApi";

const useCategoryStore = create((set) => ({
    categories: [],
    category: null,

    fetchAllCategories: async () => {
        // const token = useAuthStore.getState().accessToken;
        // const token = localStorage.getItem("accessToken");
        const res = await authApi.get("/categories");
        set({ categories: res.data.categories });
        return res;
    },

    createCategory: async (data) => {
        // const token = useAuthStore.getState().accessToken;
        const token = localStorage.getItem("accessToken");
        const res = await adminApi.post("/categories", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });

        set((state) => ({ categories: [...state.categories, res.data.result] }));
        return res;
    },

    updateCategory: async (id, data) => {
        // const token = useAuthStore.getState().accessToken;
        const token = localStorage.getItem("accessToken");
        const res = await adminApi.put(`/categories/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        set((state) => ({
            categories: state.categories.map((category) =>
                category.id === id ? res.data.categories : category
            )
        }));
        return res;
    },

    deleteCategory: async (id) => {
        // const token = useAuthStore.getState().accessToken;
        const token = localStorage.getItem("accessToken");
        const res = await adminApi.delete(`/categories/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        set((state) => ({
            categories: state.categories.filter((category) =>category.id !== id)
        }));
        return res;
    }
}))

export default useCategoryStore;