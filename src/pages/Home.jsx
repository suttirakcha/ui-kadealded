import { HorizontalCarousel, VerticalCarousel } from '@/components/custom/HeroCarousel'
import { CardDeal } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { items } from '../data/items'

function Home() {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/deal/${id}`)
  }
  return (
    <div>
      <section className="grid grid-cols bg-yellow-200 h-[320px]">
        <div className="max-w-[1280px] mx-auto w-full p-8 grid max-lg grid-cols-2 gap-12 items-center">
          <h1 className="text-5xl leading-15 font-bold">
            Let's explore our promotions here!
          </h1>
          <Input placeholder="Search our promotions" className="bg-white" />
        </div>
      </section>

      <section>
        <div className="max-w-[1350px] mx-auto w-full p-8 flex justify-center gap-4">
          <HorizontalCarousel />
          <VerticalCarousel />
        </div>
      </section>

      <div className='bg-[#B51A00] mx-auto max-w-[1200px] w-full h-full rounded-2xl p-20 flex gap-3 relative'>
        <button className='bg-[#F42B2B] absolute -left-8 -top-5 text-white p-2 mx-2 rounded-xl px-8 text-2xl font-bold hover:bg-red-700'>Hot deal</button>
        {items.map(item => (
          <CardDeal
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={item.imgSrc} alt="promotion" className='w-full h-full object-cover' />
            <p className='mx-auto p-3 text-center'>{item.description}</p>
          </CardDeal>
        ))}</div>

      <div className='mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 flex gap-3'>
        {items.map(item => (
          <CardDeal
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={item.imgSrc} alt="promotion" className='w-full h-full object-cover' />
            <p className='mx-auto p-3 text-center'>{item.description}</p>
          </CardDeal>
        ))}
      </div>

      <div className='mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 flex gap-3'>
        {items.map(item => (
          <CardDeal
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={item.imgSrc} alt="promotion" className='w-full h-full object-cover' />
            <p className='mx-auto p-3 text-center'>{item.description}</p>
          </CardDeal>
        ))}
      </div>

    </div>
  )
}

export default Home