import React from 'react'
import Header from '../components/custom/Header'
import { Outlet } from 'react-router'

function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default MainLayout