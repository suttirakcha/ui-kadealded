import CustomInput from '@/components/custom/CustomInput';
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router';

function ProfileUserLayout() {
  return (
    <>
      <div className="min-h-screen bg-white font-sans">
          <Outlet />
      </div>
    </>
  )
}

export default ProfileUserLayout;
