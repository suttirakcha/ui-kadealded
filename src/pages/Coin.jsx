import React from "react";
import PaymentComponent from "@/components/custom/PaymentComponent";

const coinOptions = [
  { id: "price_1RtS5xQoHlIWzwPgs2Qlz45q", coinName: "Bronze Coin", amount: 200 },
  { id: "price_1RtS6aQoHlIWzwPgflHOwQTB", coinName: "Silver Coin", amount: 500 },
  { id: "price_1RtS6uQoHlIWzwPg3J8KkarH", coinName: "Gold Coin", amount: 1000 },
];

const TopUpPage = () => {
  const handleSelect = (amount) => {
    
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-semibold text-center mb-10">
        เลือก Coin ที่ต้องการเติม
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {coinOptions.map((coin) => (
          <PaymentComponent
            key={coin.id}
            coinName={coin.coinName}
            amount={coin.amount}
            onSelect={handleSelect}
            id={coin.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TopUpPage;
