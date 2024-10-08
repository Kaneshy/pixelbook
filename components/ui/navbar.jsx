import Link from 'next/link'
import React from 'react'

const Navbar = ({colorB, colorC}) => {
  return (
    <nav
      className='w-full z-50   py-4 px-4 flex justify-center'>
      <Link className='font-bold bg-opacity-10 px-4 bg-blur-lg  rounded-full ' href={'/'}>PIXELBOOK</Link>
    </nav>
  )
}

export default Navbar