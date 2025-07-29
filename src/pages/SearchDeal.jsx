import { CardDeal } from "@/components/ui/card";
import { items, items2 } from "../data/items";

function SearchDeal() {
  return (
    <div>
      <div className="flex flex-col items-center my-10">
      <input type="text" className="shadow-md rounded-md w-1/3 py-1 border border-gray-100" />
      </div>
      <h1 className="text-lg font-bold ml-110">
        Search results for "blah" (8 results)
      </h1>

      <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 flex gap-3 relative">
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

      <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 flex gap-3 relative">
        {items2.map((item) => (
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
