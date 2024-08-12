'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import DashboardBanner from './DashboardBanner'
import { LiaCogSolid } from 'react-icons/lia'
import Link from 'next/link'

const DashboardCard = ({
  href,
  title,
  description,
  buttonLabel,
}: {
  href: string;
  title: string;
  description: string;
  buttonLabel: string;
}) => { 

  const { push } = useRouter()
  return(
  <Link
    className="flex flex-col p-4 rounded-md transition-all duration-300 shadow-sm bg-gradient-to-r from-pink-50 via-red-100 to-orange-100 dark:from-zinc-950 dark:via-neutral-950 dark:to-neutral-950 h-full border "
    href={href}
  >
    <h1 className="font-medium text-lg mb-2 text-gray-800 dark:text-gray-100">{title}</h1>
    <p className=" text-neutral-600 dark:text-neutral-300 mb-4">{description}</p>
   
    <button onClick={()=>push(href)} className="self-start px-4 py-2 mt-auto transition-all ease-in-out duration-150 text-white active:scale-[0.98] bg-red-500 rounded-md hover:bg-red-600">
      {buttonLabel}
    </button>

  </Link>
)}


const DashboardMain = () => {
  const searchParam = useSearchParams().get('manage')

  return (
    searchParam === 'banner' ? (
      <DashboardBanner />
    ) : (
      <div className="mx-auto flex flex-col gap-4 w-full h-fit">
        <h2 className="text-base font-medium flex items-center gap-1">
          <LiaCogSolid size={24} className="inline" /> Dashboard
        </h2>
   
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit w-full items-start">
        <DashboardCard
          href="/dashboard?manage=banner"
          title="Control Banner"
          description="Easily customize and manage your website banner for promotions and announcements."
          buttonLabel="Manage "
        />
        <DashboardCard
          href="/dashboard?manage=tuf-plus"
          title="Manage Tuf+"
          description="Configure and control your Tuf+ settings to enhance your user experience."
          buttonLabel="Manage "
        />
        <DashboardCard
          href="/dashboard?manage=flash-cards"
          title="Manage Flash Cards"
          description="Create and organize flash cards for better learning and retention."
          buttonLabel="Manage"
        />
        <DashboardCard
          href="/dashboard?manage=testimonials"
          title="Manage Testimonials"
          description="Collect, review, and showcase customer testimonials to build trust."
          buttonLabel="Manage"
        />
        </div>
      </div>
    )
  )
}

export default DashboardMain
