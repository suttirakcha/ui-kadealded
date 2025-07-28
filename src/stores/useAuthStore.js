import { authApi } from "@/api/routesApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(persist((set) => ({
  user: null,
  accessToken: null,
  login: async (data) => {
    const res = await authApi.post("/login", data, { withCredentials: true });
    set({ user: res.data.user, accessToken: res.data.token });
    return res;
  },
  logout: () => {
    set({ user: null, accessToken: null })
  }
}), {
  name: "authStore"
}))

export default useAuthStore;