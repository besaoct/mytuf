
import DashboardMain from '@/components/dashboard/DashboardMain'
import Loaders from '@/components/SkeletonLoader'
import React, { Suspense } from 'react'

export const dynamic = 'force-dynamic';


const page = () => {
  return (
    <section className='flex flex-col gap-4 h-full'>
       <Suspense fallback={<Loaders/>}>
          <DashboardMain/>
       </Suspense>
    </section>
  )
}

export default page