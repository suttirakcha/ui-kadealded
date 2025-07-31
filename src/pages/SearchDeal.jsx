import { CardDeal } from "@/components/ui/card";
import { items, items2 } from "../data/items";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";

function SearchDeal() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useSearchParams();

  const searchResult = searchQuery.get("result");

  const filteredItems = searchResult
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchResult.toLowerCase()) ||
          item.description.toLowerCase().includes(searchResult.toLowerCase())
      )
    : items;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchQuery({ result: inputValue });
          setInputValue("");
        }}
        className="flex flex-col items-center my-10 px-6"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="shadow-md rounded-md max-w-[500px] w-full px-5 py-1 border border-gray-100"
        />
      </form>
      <h1 className="text-lg font-bold mx-auto max-w-[1200px] px-6">
        Search results for {searchResult} ({filteredItems.length} result{filteredItems.length === 1 ? '' : 's'})
      </h1>
        {filteredItems.length > 0 ? <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
        {filteredItems.map((item) => (
          <CardDeal
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.imgSrc}
              alt="promotion"
              className="w-full h-full object-cover"
            />
            <h2>{item.title}</h2>
            <p className="mx-auto p-3 text-center">{item.description}</p>
          </CardDeal>
        ))}
      </div> : <div className="mx-auto w-full max-w-[300px] text-center text-3xl py-50">Result not found</div>}
      
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
