import { authApi } from "@/api/routesApi";

export const usePayment = async(data) => {
  const response = await authApi.post('/payment', data)
  console.log('response', response.data)
  window.location.href = response.data.url
}