import Footer from '@/components/custom/Footer'
import { HorizontalCarousel, VerticalCarousel } from '@/components/custom/HeroCarousel'
import { CardDeal } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

function Home() {
  return (
    <div>
      <section className="grid grid-cols bg-yellow-200 h-[320px]">
        <div className="max-w-[1280px] mx-auto w-full p-8 grid max-lg grid-cols-2 gap-12 items-center">
          <h1 className="text-5xl leading-15 font-bold">
            Let's explore our promotions here!
          </h1>
          <Input placeholder="Search our promotions" className="bg-white"/>
        </div>
      </section>

      <section>
        <div className="max-w-[1350px] mx-auto w-full p-8 flex justify-center gap-4">
          <HorizontalCarousel />
          <VerticalCarousel />
        </div>
      </section>

       <div className='bg-[#B51A00] mx-auto max-w-[1200px] w-full h-full rounded-2xl p-20 flex gap-3 mb-20'>
        <CardDeal className="overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img src="/src/assets/mock1.png" alt="promotion" className='w-full h-full object-cover'/>
        </CardDeal>
        <CardDeal className="overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img src="/src/assets/mock2.png" alt="promotion" className='w-full h-full object-cover'/>
        </CardDeal>
        <CardDeal className="overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img src="/src/assets/mock3.png" alt="promotion" className='w-full h-full object-cover'/>
        </CardDeal>
        <CardDeal className="overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img src="/src/assets/mock4.png" alt="promotion" className='w-full h-full object-cover'/>
        </CardDeal>

       </div>
      <Footer />
    </div>
  )
}

export default Home