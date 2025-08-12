import { authApi } from "@/api/routesApi";
import { create } from "zustand";

const useTransactionStore = create((set) => ({
  topupCoins: async (amount) => {
    const res = await authApi.post("/auth/coins/topup", { amount });
    return res;
  },
  reduceCoins: async (amount) => {
    const res = await authApi.post("/auth/coins/use", { amount });
    return res;
  }
}))

export default useTransactionStore