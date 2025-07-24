import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function HorizontalCarousel() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const totalSlides = 5

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      const nextIndex = (current + 1) % totalSlides
      api.scrollTo(nextIndex)
    }, 5000)

    return () => clearInterval(interval)
  }, [api, current])

  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-[1200px] mx-auto">
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
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const totalSlides = 5

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      const nextIndex = (current + 1) % totalSlides
      api.scrollTo(nextIndex)
    }, 5000)

    return () => clearInterval(interval)
  }, [api, current])

  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])
  return (
    <div>
      <Carousel
        orientation="vertical"
        opts={{ align: "start" }}
        setApi={setApi}
      className="w-full max-w-[360px] h-[380px] mx-auto"
      >
        <CarouselContent className="-mt-2 h-[380px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-2">
              <div>
                <Card className="h-[350px] w-[350px] overflow-hidden rounded-md">
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

