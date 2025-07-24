import React from 'react'
import Header from '../components/custom/Header'
import { Outlet } from 'react-router'

function MainLayout() {
    return (
        <>
            <Header />
            <main className='mt-13'>
            <Outlet />
            </main>
        </>
    )
}

export default MainLayout