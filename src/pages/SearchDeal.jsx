import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import useDealStore from "@/stores/useDealStore";
import CardDealList from "@/components/custom/CardDealList";
import SearchForm from "@/components/custom/SearchForm";
import Loading from "@/components/icons/Loading";
import { cn } from "@/lib/utils";

function SearchDeal() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dealsPerPage] = useState(8);
  const location = useLocation();
  const { deals, getAllDeals, isLoading } = useDealStore();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useSearchParams();

  const searchResult = searchQuery.get("result");

  useEffect(() => {
    setSearchQuery({ result: location.state?.result || searchResult || "" });
    const run = async () => {
      await getAllDeals();
    };

    run();
  }, []);

  const indexOfLastDeals = currentPage * dealsPerPage;
  const indexOfFirstDeals = indexOfLastDeals - dealsPerPage;

  const allFilteredItems = searchResult
    ? deals.filter(
        (item) =>
          item.title.toLowerCase().includes(searchResult.toLowerCase()) ||
          item.description.toLowerCase().includes(searchResult.toLowerCase())
      )
    : deals;

  const filteredItems = allFilteredItems.slice(
    indexOfFirstDeals,
    indexOfLastDeals
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery({ result: inputValue });
    setInputValue("");
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery({});
    setInputValue("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(
    (searchResult ? allFilteredItems?.length : deals?.length) / dealsPerPage
  );

  return (
    <div className="px-6 py-10">
      <SearchForm
        onSubmit={handleSearch}
        value={inputValue}
        placeholder="ค้นหาดีลที่จะส่อง"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex items-center gap-4 max-w-[1200px] w-full mx-auto pt-10">
        {searchResult ? (
          <h1 className="text-lg font-bold">
            ค้นหาดีลสำหรับ "{searchResult}" ({allFilteredItems?.length} ดีล)
            {/* {filteredItems?.length === 1 ? "" : "s"} */}
          </h1>
        ) : (
          <h1 className="text-lg font-bold">
            ดีลทั้งหมด ({deals?.length} ดีล)
          </h1>
        )}

        {searchResult && (
          <button className="text-red-500 cursor-pointer" onClick={clearSearch}>
            ล้าง
          </button>
        )}
      </div>
      {!isLoading ? (
        <>
          {filteredItems?.length > 0 ? (
            <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
              <CardDealList
                items={filteredItems}
                onClick={(id) => navigate(`/deal/${id}`)}
              />
            </div>
          ) : (
            <div className="mx-auto w-full text-center text-3xl py-50 font-bold text-red-500">
              ขอโทษครับ ผมไปส่องแล้วไม่มีดีลที่คุณค้นหาครับ
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      )}
      <Pagination className="mb-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() =>
                setCurrentPage((prev) => (currentPage === 1 ? 1 : prev - 1))
              }
            />
          </PaginationItem>
          <PaginationItem className="space-x-2">
            {Array.from({ length: totalPages || 1 }).map((_, index) => (
              <PaginationLink
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={cn("cursor-pointer", {
                  "bg-gray-100": currentPage === index + 1,
                })}
              >
                {index + 1}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + (currentPage === totalPages ? 0 : 1)
                )
              }
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
export default SearchDeal;
