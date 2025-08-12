import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useDealStore from "@/stores/useDealStore";
import MainCarousel from "@/components/custom/MainCarousel";
import CardDealList from "@/components/custom/CardDealList";
import Loading from "@/components/icons/Loading";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";
import { JoinDealDialog } from "@/components/dialogs/JoinDealDialog.jsx";
import axios from "axios";

function DealPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    deals,
    isLoading,
    currentDeal: deal,
    getAllDeals,
    getDealById,
    clearCurrentDeal,
    joinedDeals,
    getJoinedDeals,
  } = useDealStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (id) {
        await getAllDeals();
        await getDealById(id);
        await getJoinedDeals(id);
      }
    };

    run();
    return () => clearCurrentDeal();
  }, [id, getAllDeals, getDealById, getJoinedDeals, clearCurrentDeal]);

  const joinedDealsProgress =
    (joinedDeals?.length / deal?.max_participants) * 100;
  const isDealFull = joinedDeals?.length >= deal?.max_participants;

  const category = deal?.category.name;

  if (isLoading || !deal) {
    // return <div className="text-center text-xl mt-10">ไม่พบข้อมูลดีลนี้</div>
    return (
      <div className="flex justify-center py-10">
        <Loading className="animate-spin h-20 w-20" />
      </div>
    );
  }

  const handleClick = (id) => {
    navigate(`/deal/${id}`);
    window.scrollTo({ top: 0 });
  };

  const filteredDealsByCategory = deals?.filter(
    (deal) => deal.category.name === category
  );

  const handleConfirmJoin = async (dealId) => {
    if (!user) {
      toast.error("กรุณาเข้าสู่ระบบเพื่อเข้าร่วมดีล");
      // navigate("/login");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("โทเค็นไม่ถูกต้อง, กรุณาเข้าสู่ระบบอีกครั้ง");
        return;
      }
      const response = await axios.post(`/api/auth/deal/${dealId}/join`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getJoinedDeals(id);
      return response.data.qrCode.token;
    } catch (error) {
      console.error("Error joining deal:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to join deal";
      toast.error(errorMessage);
      throw error;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-10 p-10 bg-white shadow-lg rounded-2xl">
      <h1 className="text-4xl font-bold text-center mb-10">{deal.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded-xl mb-15">
        <MainCarousel images={deal.images} />
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-medium text-lg">ประเภท: {deal.category.name}</p>
            {/* <h2 className="text-2xl font-semibold text-gray-800">
              Description
            </h2> */}
            <p className="text-gray-600 text-base">{deal.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-center flex gap-2 items-center">
              <h2 className="text-xl font-medium">จำนวนผู้เข้าร่วม</h2>
              <Badge className="bg-gray-200 text-[#003f66] text-xl px-4 py-1 rounded-full">
                {(isDealFull ? deal?.max_participants : joinedDeals?.length) ||
                  0}{" "}
                / {deal?.max_participants}
              </Badge>
            </div>
            <Progress value={joinedDealsProgress} className="h-4" />
          </div>
          <div className="mt-6 space-x-5">
            <button
              className={cn(
                "bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-md text-lg",
                { "!bg-red-400": isDealFull }
              )}
              onClick={() => setIsModalOpen(true)}
              disabled={isDealFull}
            >
              {isDealFull ? "จำนวนผู้เข้าร่วมเต็มแล้ว" : "เข้าร่วมดีล"}
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl text-lg"
              onClick={() => navigate("/")}
            >
              กลับหน้าแรก
            </button>
            {/* <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl shadow-md text-lg">
              20%
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl shadow-md text-lg">
              40%
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl shadow-md text-lg">
              60%
            </button> */}
          </div>
        </div>
      </div>
      {/* 
      <div className="bg-[#B51A00] mx-auto max-w-[1200px] w-full h-full rounded-2xl p-20 flex gap-3 relative mb-15">
        <button className="bg-[#F42B2B] absolute -left-6 -top-5 text-white p-2 mx-2 rounded-xl px-8 text-2xl font-bold hover:bg-red-700">
          Hot deal
        </button>
        <div className="grid grid-cols-4 gap-3">
          <CardDealList items={filteredDealsByCategory} onClick={handleClick} />
        </div>
      </div> */}

      <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl py-10 flex gap-3 relative">
        <button className="bg-[#F42B2B] absolute -left-3 -top-8 text-white p-2 mx-2 rounded-3xl px-8 text-2xl font-bold hover:bg-red-700">
          OTHER OFFERS{" "}
        </button>
        <div className="grid grid-cols-4 gap-3">
          <CardDealList items={filteredDealsByCategory} onClick={handleClick} />
        </div>
      </div>
      <JoinDealDialog
        open={isModalOpen}
        setOpen={setIsModalOpen}
        deal={deal}
        onConfirmJoin={handleConfirmJoin}
      />
    </div>
  );
}

export default DealPage;
