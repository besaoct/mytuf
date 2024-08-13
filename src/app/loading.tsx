import React from 'react'
import { BiLoader } from 'react-icons/bi'

const Loading = () => {
  return (
<div className='w-full flex justify-center items-center h-[80vh] min-h-fit'>
    <BiLoader size={32} className='animate-spin'/>
  </div>
  )
}

export default Loading