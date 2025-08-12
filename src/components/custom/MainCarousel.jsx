import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

function MainCarousel({
  images,
  orientation = "horizontal",
  opts,
  className,
  contentClassName,
  cardClassName,
}) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const totalSlides = images ? images.length : 1;

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      const nextIndex = (current + 1) % totalSlides;
      api.scrollTo(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [api, current]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative h-full">
      <Carousel
        setApi={setApi}
        className={className}
        opts={opts}
        orientation={orientation}
      >
        <CarouselContent className={contentClassName}>
          {images && (
            <>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="cursor-grab active:cursor-grabbing">
                    <Card className={cardClassName}>
                      <img
                        src={image.image_url}
                        alt={`img-${index}`}
                        className="w-full h-full object-cover rounded-md aspect-square"
                      />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>
      </Carousel>
      {images && (
        <div
          className={cn(
            "text-center flex gap-1.5 absolute justify-center", { "bottom-5 w-full": orientation === "horizontal" },
            { "flex-col right-5 h-full top-0": orientation === "vertical" }
          )}
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              className={cn("w-2 h-2 bg-gray-200 rounded-full opacity-50 cursor-pointer", {
                "opacity-100": current === index,
              })}
              onClick={() => {
                setCurrent(index);
                api.scrollTo(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MainCarousel;
