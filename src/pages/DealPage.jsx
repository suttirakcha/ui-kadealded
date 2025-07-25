import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { AllDeal, HotDeal, items, items2 } from '../data/items'
import { CardDeal } from '@/components/ui/card'

function DealPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const deal = AllDeal.find(item => item.id === parseInt(id))

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    if (!deal) {
        return <div className="text-center text-xl mt-10">ไม่พบข้อมูลดีลนี้</div>
    }

    const handleClick = (id) => {
        navigate(`/deal/${id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="max-w-[1200px] mx-auto mt-10 p-6 bg-gray-200 rounded-2xl">
            <h1 className="text-4xl font-bold text-center mb-10 text-red-600">
                {deal.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white shadow-lg rounded-xl p-8 mb-15">
                <img
                    src={deal.imgSrc}
                    alt={deal.title}
                    className="w-full h-auto rounded-xl shadow-md"
                />
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">รายละเอียด</h2>
                    <p className="text-gray-600">{deal.description}</p>
                    <div className="mt-6 space-x-5">

                        <button
                            className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-md text-lg"
                            onClick={() => alert('📦 Deal Complete!')}
                        >
                            รับสิทธิ์
                        </button>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl shadow-md text-lg"
                        >
                            20%
                        </button>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl shadow-md text-lg"
                        >
                            40%
                        </button>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl shadow-md text-lg"
                        >
                            60%
                        </button>
                    </div>
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl text-lg"
                        onClick={() => navigate('/')}
                    >
                        กลับหน้าแรก
                    </button>
                </div>
            </div>

        <div className='bg-[#B51A00] mx-auto max-w-[1200px] w-full h-full rounded-2xl p-20 flex gap-3 relative mb-15'>
                <button className='bg-[#F42B2B] absolute -left-6 -top-5 text-white p-2 mx-2 rounded-xl px-8 text-2xl font-bold hover:bg-red-700'>Hot deal</button>
                {HotDeal.map(item => (
                  <CardDeal
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <img src={item.imgSrc} alt="promotion" className='w-full h-full object-cover' />
                    <p className='mx-auto p-3 text-center'>{item.description}</p>
                  </CardDeal>
                ))}</div>

            <div className='mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 flex gap-3 relative'>
                <button className='bg-[#F42B2B] absolute -left-3 -top-8 text-white p-2 mx-2 rounded-3xl px-8 text-2xl font-bold hover:bg-red-700'>
                    OTHER OFFER </button>
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

            <div className='mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 flex gap-3 relative'>
                {items2.map(item => (
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

export default DealPage
