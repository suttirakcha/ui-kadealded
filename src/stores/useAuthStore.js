import { authApi } from "@/api/routesApi";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: async (data) => {
        const res = await authApi.post("/login", data, {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", res.data.token);
        set({ user: res.data.user });
        return res;
      },
      loginWithGoogle: async (code) => {
        const res = await authApi.post("/auth/google", { code });
        const { token, user } = res.data;

        set({ user, token });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return res;
      },
      register: async (data) => {
        const res = await authApi.post("/register", data, {
          withCredentials: true,
        });
        return res;
      },
      logout: async () => {
        localStorage.removeItem("accessToken");
        await authApi.post("/logout");
        set({ user: null });
      },
      updateAuthUser: (updatedUser) =>
        set((state) => ({
          user: {
            ...state.user,
            ...updatedUser,
          },
        })),
    }),
    {
      name: "authStore",
    }
  )
);

export default useAuthStore;
