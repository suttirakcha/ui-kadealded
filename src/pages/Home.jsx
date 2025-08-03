import MainCarousel from "@/components/custom/MainCarousel";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { HotDeal, items, items2 } from "../data/items";
import useDealStore from "@/stores/useDealStore";
import CardDealList from "@/components/custom/CardDealList";
import SearchForm from "@/components/custom/SearchForm";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { deals, getAllDeals } = useDealStore();
  const [inputValue, setInputValue] = useState("");
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/searchDeal', { state: { result: inputValue } });
  }

  useEffect(() => {
    const run = async () => {
      await getAllDeals();
    };

    run();
  }, []);

  const handleClick = (id) => {
    navigate(`/deal/${id}`);
  };

  return (
    <div>
      <section className="flex items-center bg-gray-800 h-[400px]">
        <div className="max-w-[500px] mx-auto w-full text-center flex flex-col p-8 gap-12 items-center">
          <h1 className="text-5xl leading-15 font-bold text-white">
            Let's explore our promotions here!
          </h1>
          <SearchForm 
            value={inputValue}
            placeholder="Search our promotions"
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={handleSearch}
          />
          {/* <Input placeholder="Search our promotions" className="bg-white" /> */}
        </div>
      </section>

      <section>
        <div className="max-w-[1350px] mx-auto w-full p-8 flex justify-center gap-4">
          <MainCarousel
            className="w-full max-w-[1200px] mx-auto"
            orientation="horizontal"
            cardClassName="h-[350px] w-full overflow-hidden rounded-md"
          />
          <MainCarousel
            className="w-full max-w-[360px] h-[380px] mx-auto"
            orientation="vertical"
            contentClassName="h-[380px]"
            opts={{ align: "start" }}
            cardClassName="h-[350px] w-[350px] overflow-hidden rounded-md"
          />
        </div>
      </section>

      <div className="bg-[#B51A00] mx-auto max-w-[1200px] w-full h-full rounded-2xl p-20 flex gap-3 relative">
        <button className="bg-[#F42B2B] absolute -left-8 -top-5 text-white p-2 mx-2 rounded-xl px-8 text-2xl font-bold hover:bg-red-700">
          Hot deal
        </button>
        <div className="grid grid-cols-4 gap-3">
          <CardDealList items={deals} onClick={handleClick} />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 grid grid-cols-4 gap-3">
        <CardDealList items={deals} onClick={handleClick} />
      </div>

      <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 grid grid-cols-4 gap-3">
        <CardDealList items={deals} onClick={handleClick} />
      </div>
    </div>
  );
}

export default Home;
