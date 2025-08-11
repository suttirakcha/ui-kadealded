import { adminApi, authApi } from "@/api/routesApi";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,
  dealHistory: [],
  coinHistory: [],

  fetchAllUsers: async () => {
    // const token = useAuthStore.getState().accessToken;
    const token = localStorage.getItem("accessToken");
    set({ loading: true, error: null });
    try {
      const res = await adminApi.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ users: res.data.Users, loading: false });
      return res;
    } catch (error) {
      console.error("Error fetching users:", error);
      set({
        error: error.response?.data?.message || "Fetch failed",
        loading: false,
      });
    }
  },

  updateUserById: async (id, data) => {
    // const token = useAuthStore.getState().accessToken;
    const token = localStorage.getItem("accessToken");
    set({ loading: true, error: null });
    try {
      const res = await adminApi.put(`/users/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? res.data : user)),
        loading: false,
      }));
      return res;
    } catch (error) {
      console.error("Error updating user:", error);
      set({
        error: error.response?.data?.message || "Update failed",
        loading: false,
      });
    }
  },

  getDealHistory: async () => {
    set({ dealHistory: [], loading: true });
    const token = localStorage.getItem("accessToken");
    const res = await authApi.get("/auth/deal/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ dealHistory: res.data.result, loading: false });
  },
  getCoinHistory: async () => {
    set({ coinHistory: [], loading: true });
    const token = localStorage.getItem("accessToken");
    const res = await authApi.get("/auth/coins/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ coinHistory: res.data.result, loading: false });
  },
}));

export default useUserStore;
