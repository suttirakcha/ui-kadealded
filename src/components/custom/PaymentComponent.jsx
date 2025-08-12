import { usePayment } from '@/stores/usePayment';
import React from 'react';

const PaymentComponent = ({ coinName, amount, onSelect,id }) => {
  const hdlPayment = async () => {
    console.log('pay')
    const data = {amount, priceId: id}
    await usePayment(data)
  }
  return (
    <div className="max-w-xs w-full bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{coinName}</h3>
      <p className="text-2xl font-bold text-blue-600 mb-4">฿{amount.toLocaleString()}</p>
      <button
        onClick={hdlPayment}
        className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        เลือก
      </button>
    </div>
  );
};

export default PaymentComponent;
