function ProfileMemberData() {
  const totalPurchase = 200;
  const nextLevelThreshold = 1000;
  const coupons = [
    { name: "ส่วนลด 10%", code: "DISCOUNT10", expiry: "31/12/2025" },
    { name: "ลดค่าส่ง", code: "SHIPFREE", expiry: "15/09/2025" },
  ];

  const progressPercent = Math.min(
    (totalPurchase / nextLevelThreshold) * 100,
    100
  );
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow">
        <h3 className="text-lg font-semibold text-[#083b63] mb-2">
          ระดับสมาชิก
        </h3>
        <p className="text-gray-700 mb-2">
          • Bronze / Silver / Gold / Platinum
        </p>
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-[#083b63] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm mt-2 text-gray-600">
          ยอดซื้อสะสม: {totalPurchase} บาท / {nextLevelThreshold} บาท
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <h3 className="text-lg font-semibold text-[#083b63] mb-2">
          คูปองของฉัน
        </h3>
        {coupons.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีคูปอง</p>
        ) : (
          <ul className="text-sm text-gray-700 space-y-2">
            {coupons.map((coupon, index) => (
              <li key={index} className="border-b pb-2">
                <p className="font-medium">{coupon.name}</p>
                <p>
                  Code:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {coupon.code}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  หมดอายุ: {coupon.expiry}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProfileMemberData;
