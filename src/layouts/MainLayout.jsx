import React from 'react'
import Header from '../components/custom/Header'
import { Outlet } from 'react-router'
import Footer from '@/components/custom/Footer'

function MainLayout() {
    return (
        <>
            <Header />
            <main className='mt-13'>
            <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout