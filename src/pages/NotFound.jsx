import React from 'react'
import { Link } from 'react-router'

function NotFound() {
  return (
    <div className='p-8 flex flex-col items-center text-center gap-y-5 h-screen justify-center max-w-[600px] w-full mx-auto'>
      <img src="src/assets/cryingface.png" alt="crying face" className='w-3/5'/>
      <h1 className='text-8xl font-bold'>404</h1>
      <h1 className='text-6xl font-bold'>PAGE NOT FOUND</h1>
      <h3 className='text-3xl'>Uh oh! It seems that the page you are accessing is not found!</h3>
      <button className='bg-[#004066] text-white rounded-sm px-10 py-3' to='/'><Link to='/'>Back to Homepage</Link></button>
    </div>
  )
}

export default NotFound