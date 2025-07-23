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
        <div className="max-w-[1280px] mx-auto w-full p-8 grid">
          Promotions
        </div>
      </section>
    </div>
  )
}

export default Home