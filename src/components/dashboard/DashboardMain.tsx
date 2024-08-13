'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import DashboardBanner from './DashboardBanner'
import Link from 'next/link'
import { BiLoader } from 'react-icons/bi'
import DashboardFlashcards from './DashboardFlashcards'

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
    className="flex flex-col p-4 rounded-md transition-all duration-300 shadow-sm bg-gradient-to-r bg-white dark:from-zinc-950 cursor-default dark:via-neutral-950 dark:to-neutral-950 h-fit border dark:bg-black "
    href={href}
  >
    <h1 className="font-semibold text-base mb-2 text-gray-800 dark:text-gray-100">{title}</h1>
    <p className=" text-muted-foreground dark:text-neutral-300 mb-4 break-words line-clamp-1">{description}</p>
   
    <button onClick={()=>push(href)} className="self-start px-4 py-2 mt-auto transition-all ease-in-out duration-150 text-white active:scale-[0.98] bg-red-500 rounded-md hover:bg-red-600">
      {buttonLabel}
    </button>

  </Link>
)}


const DashboardMain = () => {
  const searchParam = useSearchParams().get('manage')

  return (
    searchParam === 'banner' ? (
      <Suspense fallback={<>
         <div className='w-full flex justify-center items-center h-[80vh] min-h-fit'>
          <BiLoader size={32} className='animate-spin'/>
        </div>
      </>}>
         <DashboardBanner />
      </Suspense>
    ) :

    searchParam === 'flash-cards' ? (
      <Suspense fallback={<>
         <div className='w-full flex justify-center items-center h-[80vh] min-h-fit'>
          <BiLoader size={32} className='animate-spin'/>
        </div>
      </>}>
         <DashboardFlashcards/>
      </Suspense>
    ) 
    
    : (
      <div className="mx-auto flex flex-col gap-4 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit w-full items-start">
        <DashboardCard
          href="/dashboard?manage=banner"
          title="Control Banner"
          description="Easily customize and manage your website banner for promotions and announcements."
          buttonLabel="Manage "
        />
        <DashboardCard
          href="/dashboard?manage=flash-cards"
          title="Manage Flashcards"
          description="Create and organize flash cards for better learning and retention."
          buttonLabel="Manage"
        />
        <DashboardCard
          href="/dashboard?manage=tuf-plus"
          title="Manage Tuf+"
          description="Configure and control your Tuf+ settings to enhance your user experience."
          buttonLabel="Manage "
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
