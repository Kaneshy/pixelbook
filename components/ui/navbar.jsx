import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full  text-white bg-black py-4 px-4 flex justify-between'>
        <Link className='font-bold' href={'/'}>PIXELBOOK</Link>
    </nav>
  )
}

export default Navbar