'use client'
import { bottonBarC } from '@/constants/format'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsUpload } from "react-icons/bs";
import UploadWidgetCdl from '../UploadWidget';




const BottonBar = () => {
  const [isopen, setisopen] = useState(false)


  return (
    <>
      <main className='lg:hidden z-40 text-sm  bg-[#070707] backdrop-blur-md bg-opacity-90'>
        <section className='flex p-2 justify-evenly  gap-2 w-full '>
          {bottonBarC.map((x, index) => {
            return (
              <Link href={x.route} key={index} className='p-2  hover:bg-zinc-900 rounded-xl justify-center flex flex-col items-center gap-1 '>
                <div>{x.logo}</div>
                <p className='max-sm:hidden' >{x.name}</p>
              </Link>
            )
          })}
          <button onClick={() => setisopen(!isopen)} className='p-2 justify-center  rounded-xl  hover:bg-zinc-900 flex flex-col items-center gap-1 '>
            <div><BsUpload size={20} /></div>
            <p className='max-sm:hidden' >Uplaod</p>
          </button>
        </section>

      </main>
      {isopen && (
        <UploadWidgetCdl isopen={isopen} setisopen={setisopen} />
      )}
    </>
  )

}

export default BottonBar
