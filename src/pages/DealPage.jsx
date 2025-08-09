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

function DealPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    deals,
    currentDeal: deal,
    getAllDeals,
    getDealById,
    clearCurrentDeal,
    joinedDeals,
    getJoinedDeals,
  } = useDealStore();

  useEffect(() => {
    const run = async () => {
      await getAllDeals();
      await getDealById(id);
      await getJoinedDeals(id);
    };

    run();
    return () => clearCurrentDeal();
  }, [id]);

  const joinedDealsProgress =
    (joinedDeals?.length / deal?.max_participants) * 100;
  const isDealFull = joinedDeals?.length >= deal?.max_participants;

  const category = deal?.category.name;

  if (!deal) {
    // return <div className="text-center text-xl mt-10">ไม่พบข้อมูลดีลนี้</div>
    return (
      <div className="flex justify-center py-10">
        <Loading className="animate-spin h-20 w-20" />
      </div>
    );
  }

  const handleClick = (id) => {
    // getDealById(id);
    navigate(`/deal/${id}`);
    window.scrollTo({ top: 0 });
  };

  const filteredDealsByCategory = deals?.filter(
    (deal) => deal.category.name === category
  );

  return (
    <div className="max-w-[1200px] mx-auto mt-10 p-10 bg-white shadow-lg rounded-2xl">
      <h1 className="text-4xl font-bold text-center mb-10">{deal.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded-xl mb-15">
        <MainCarousel images={deal.images} />
        <div className="space-y-4">
          <p className="text-sm">{deal.category.name}</p>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Description
            </h2>
            <p className="text-gray-600">{deal.description}</p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-medium">Joined deal amounts</h2>
              <Badge className="bg-gray-200 text-[#003f66] text-2xl px-4 py-1 rounded-full">
                {(isDealFull ? deal?.max_participants : joinedDeals?.length) ||
                  0}{" "}
                / {deal?.max_participants}
              </Badge>
            </div>
            <Progress value={joinedDealsProgress} className="h-4" />
          </div>
          <div className="mt-6 space-x-5">
            {/* TODO: join the deal button */}
            <button
              className={cn(
                "bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-md text-lg",
                { "!bg-red-400": isDealFull }
              )}
              onClick={() => {
                toast.success("เข้าร่วมดีลแล้ว")
              }}
              disabled={isDealFull}
            >
              {isDealFull ? "This deal is fully joined" : "Join deal"}
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

      <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 flex gap-3 relative">
        <button className="bg-[#F42B2B] absolute -left-3 -top-8 text-white p-2 mx-2 rounded-3xl px-8 text-2xl font-bold hover:bg-red-700">
          OTHER OFFER{" "}
        </button>
        <div className="grid grid-cols-4 gap-3">
          <CardDealList items={filteredDealsByCategory} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default DealPage;
