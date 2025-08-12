import MainCarousel from "@/components/custom/MainCarousel";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useDealStore from "@/stores/useDealStore";
import CardDealList from "@/components/custom/CardDealList";
import SearchForm from "@/components/custom/SearchForm";
import { ChevronRight } from "lucide-react";
import imageMock from "../assets/imagemock.png";
import imageMock2 from "../assets/imagemock2.png";

function Home() {
  const navigate = useNavigate();
  const { deals, getAllDeals, isLoading } = useDealStore();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/searchDeal", { state: { result: inputValue } });
  };

  useEffect(() => {
    const run = async () => {
      await getAllDeals();
    };

    run();
  }, []);

  const handleClick = (id) => {
    navigate(`/deal/${id}`);
  };

  const imageMocks = [
    { image_url: imageMock },
    { image_url: imageMock },
    { image_url: imageMock },
  ];

  const imageMocks2 = [
    { image_url: imageMock2 },
    { image_url: imageMock2 },
    { image_url: imageMock2 },
  ];

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
        </div>
      </section>

      <section>
        <div className="max-w-[1350px] mx-auto w-full p-8 flex justify-center gap-4">
          <MainCarousel
            className="w-full max-w-[1200px] mx-auto"
            orientation="horizontal"
            cardClassName="h-[350px] w-full overflow-hidden rounded-md"
            images={imageMocks}
          />
          <MainCarousel
            className="w-full max-w-[360px] h-[380px] mx-auto"
            orientation="vertical"
            contentClassName="h-[380px]"
            opts={{ align: "start" }}
            cardClassName="h-[350px] w-[350px] overflow-hidden rounded-md"
            images={imageMocks2}
          />
        </div>
      </section>

      <div className="bg-[#B51A00] mx-auto max-w-[1200px] w-full h-full rounded-2xl p-10 flex gap-3 relative">
        <button className="bg-[#F42B2B] absolute -left-8 -top-5 text-white p-2 mx-2 rounded-xl px-8 text-2xl font-bold hover:bg-red-700">
          Hot deal
        </button>
        <div className="grid grid-cols-4 gap-3">
          <CardDealList
            items={deals.slice(0, 4)}
            onClick={handleClick}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl p-10 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Recommended Deals</h1>
          <Link
            to="/searchDeal"
            className="text-[#003F66] flex items-center gap-1 font-medium"
          >
            See more
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <CardDealList
            items={deals?.slice(0, 4)}
            onClick={handleClick}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
