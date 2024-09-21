import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full text-white bg-zinc-900 py-2 px-4 flex justify-between'>
        <Link href={'/'}>PIXELBOOK</Link>
        <div>more</div>
    </nav>
  )
}

export default Navbar