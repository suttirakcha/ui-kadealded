import { CardDeal } from "@/components/ui/card";
import { items, items2 } from "../data/items";
import { useState } from "react";

function SearchDeal() {
  const [searchQuery, setSearchQuery] = useState(null)
  return (
    <div>
      <form className="flex flex-col items-center my-10 px-6">
      <input type="text" className="shadow-md rounded-md max-w-[500px] w-full py-1 border border-gray-100" />
      </form>
      <h1 className="text-lg font-bold mx-auto max-w-[1200px] px-6">
        Search results for "blah" (8 results)
      </h1>

      <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
        {items.map((item) => (
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
            <p className="mx-auto p-3 text-center">{item.description}</p>
          </CardDeal>
        ))}
      </div>

    </div>
  );
}
export default SearchDeal;
