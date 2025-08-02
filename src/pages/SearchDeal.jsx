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

function SearchDeal() {
  const location = useLocation();
  const { deals, getAllDeals } = useDealStore();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useSearchParams();

  const searchResult = searchQuery.get("result");

  useEffect(() => {
    if (location.state) {
      setSearchQuery({ result: location.state.result });
    }

    const run = async () => {
      await getAllDeals();
    };

    run();
  }, []);

  const filteredItems = searchResult
    ? deals?.filter(
        (item) =>
          item.title.toLowerCase().includes(searchResult.toLowerCase()) ||
          item.description.toLowerCase().includes(searchResult.toLowerCase())
      )
    : deals;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery({ result: inputValue });
    setInputValue("");
  };

  const clearSearch = () => {
    setSearchQuery({});
    setInputValue("");
  };

  return (
    <div className="p-6">
      <SearchForm
        onSubmit={handleSearch}
        value={inputValue}
        placeholder="Search deals"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex items-center gap-4 max-w-[1200px] w-full mx-auto pt-10">
        <h1 className="text-lg font-bold">
          Search results for {searchResult} ({filteredItems.length} result
          {filteredItems.length === 1 ? "" : "s"})
        </h1>

        {searchResult && (
          <button className="text-red-500 cursor-pointer" onClick={clearSearch}>
            Clear
          </button>
        )}
      </div>
      {filteredItems.length > 0 ? (
        <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
          <CardDealList
            items={filteredItems}
            onClick={(id) => navigate(`/deal/${id}`)}
          />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[300px] text-center text-3xl py-50">
          Result not found
        </div>
      )}

      <Pagination className="mb-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
export default SearchDeal;
