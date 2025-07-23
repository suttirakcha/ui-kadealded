import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function HorizontalCarousel() {
  return (
    <div>
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div>
                <Card className="h-[350px] w-full overflow-hidden rounded-md">
                  <img
                    src={`/src/assets/imagemock.png`}
                    alt="promotion"
                    className="w-full h-full object-cover"
                  />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export function VerticalCarousel() {
  return (
    <div>
      <Carousel
        orientation="vertical"
        opts={{ align: "start" }}
        className="w-full mx-auto"
      >
        <CarouselContent className="-mt-2 h-[380px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-2">
              <div>
                <Card className="h-[350px] w-[300px] overflow-hidden rounded-md">
                  <img
                    src="/src/assets/imagemock2.png"
                    alt="promotion"
                    className="w-full h-full object-cover"
                  />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

