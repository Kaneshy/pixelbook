'use client'
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Editpopup from './editpopup';
import { MdEdit } from "react-icons/md";


const EditPage = ( {bookId} ) => {
    const [isopen, setisopen] = useState(false)

    return (
        <main >
            <button onClick={() => setisopen(!isopen)}
                className=' px-4 py-2 bg-[#C5705D] hover:bg-[#ff9982] rounded-xl bg-red'>
                 <MdEdit  size={20}/>
            </button>
            {isopen && (
                <div className=''>
                    <Editpopup isopen={isopen} setisopen={setisopen} bookId={bookId} />
                </div>
            )}
        </main>
    )
}

export default EditPage