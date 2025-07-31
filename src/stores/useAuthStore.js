import { authApi } from "@/api/routesApi";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      login: async (data) => {
        const res = await authApi.post("/login", data, {
          withCredentials: true,
        });
        set({ user: res.data.user, accessToken: res.data.token });
        return res;
      },
      loginWithGoogle: async (code) => {
        try {
          const res = await authApi.post("/auth/google", { code });
          const { token, user } = res.data;

          set({ user, token });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (err) {
          console.error("OAuth callback failed:", err);
        }
      },
      register: async (data) => {
        const res = await authApi.post("/register", data, {
          withCredentials: true,
        });
        return res;
      },
      logout: () => {
        set({ user: null, accessToken: null });
      },
    }),
    {
      name: "authStore",
    }
  )
);

export default useAuthStore;
