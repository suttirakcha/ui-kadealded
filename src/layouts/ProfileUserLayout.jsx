import CustomInput from '@/components/custom/CustomInput';
import ProfileMemberData from '@/components/custom/ProfileMemberData';
import ProfileUserSidebar from '@/components/custom/ProfileUserSidebar';
import useAuthStore from '@/stores/useAuthStore';
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router';

function ProfileUserLayout() {
  const { getMe } = useAuthStore();

  useEffect(() => {
    const run = async () => {
      await getMe()
    }

    run();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2f1] to-white font-sans py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col md:flex-row gap-10 items-center md:items-start">
          <ProfileUserSidebar />
          <Outlet />
        </div>

        <ProfileMemberData />
      </div>
    </div>
  )
}

export default ProfileUserLayout;
