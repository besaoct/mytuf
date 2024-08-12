
import DashboardMain from '@/components/dashboard/DashboardMain'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <section className='flex flex-col gap-4 h-full'>
       <Suspense>
          <DashboardMain/>
       </Suspense>
    </section>
  )
}

export default page