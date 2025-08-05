import { adminApi } from "@/api/routesApi";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchAllUsers: async () => {
    const token = useAuthStore.getState().accessToken;
    set({ loading: true, error: null });
    try {
      const res = await adminApi.get("/users", {
            headers: { Authorization: `Bearer ${token}` }
        });
      set({ users: res.data.Users, loading: false });
      return res;
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ error: error.response?.data?.message || "Fetch failed", loading: false });
    }
  },

  updateUserById: async (id, data) => {
    const token = useAuthStore.getState().accessToken;
    set({ loading: true, error: null });
    try {
      const res = await adminApi.put(`/users/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? res.data : user
        ),
        loading: false,
      }));
      return res;
    } catch (error) {
      console.error("Error updating user:", error);
      set({ error: error.response?.data?.message || "Update failed", loading: false });
    }
  },
}));

export default useUserStore;
