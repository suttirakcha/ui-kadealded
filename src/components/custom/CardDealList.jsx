import { CardDeal } from "@/components/ui/card";
import Loading from "../icons/Loading";

function CardDealList({ items, onClick }) {
  return (
    <>
      {items ? (
        items.length > 0 ? (
          <>
            {items.map((item) => (
              <CardDeal
                key={item.id}
                onClick={() => onClick(item.id)}
                className="bg-[#F4F4F4] cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={item.images[0]?.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover object-top aspect-square"
                />
                <h2 className="p-3 text-center font-bold text-xl">{item.title}</h2>
              </CardDeal>
            ))}
          </>
        ) : (
          <p>No deals found</p>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}

export default CardDealList;
