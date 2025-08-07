import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
    <div>
      <Carousel
        setApi={setApi}
        className={className}
        opts={opts}
        orientation={orientation}
      >
        <CarouselContent className={contentClassName}>
          {images ? (
            <>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card className={cardClassName}>
                      <img
                        src={image.image_url}
                        alt={`img-${index}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card className={cardClassName}>
                      <img
                        src={`/src/assets/imagemock.png`}
                        alt="promotion"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default MainCarousel;