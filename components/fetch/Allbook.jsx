'use client'
import { FetchAllBooks } from "@/libs/actions/db-actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../ui/navbar";


const Allbook = () => {

    const [books, setbooks] = useState([])
    const [colorB, setcolorB] = useState('#eeeeee')
    const [colorC, setcolorC] = useState('#c9c9c9')

    useEffect(() => {
        const fetchbooksdata = async () => {
            const res = await FetchAllBooks()
            setbooks(res)
            console.log(33, res)
        }
        fetchbooksdata()
    }, [])

    // bg-[#2D0201] bg-[#f0ecec]
    return (
        <div className="">
            <div className="sticky text-white bg-[#202124] top-0 z-50">
                    <Navbar />
            </div>
            <section className=" pb-12 min-h-screen z bg-[#F5EFFF]  select-none">
                <section className="grid-b p-4 ">
                    {books.map((x, i) => {
                        return (
                            <div 
                            key={`book${i}`}
                            className="flex flex-col gap-4 items-center ">
                                <div className='p-4 s relative flex justify-center items-center '>
                                    <div
                                        style={{ background: `linear-gradient(90deg, ${x.colors?.colorB} 20%, ${x.colors?.colorC} 80%)` }}
                                        className=" rounded-l-sm max-w-[10px] h-full bg-cover bg-center  w-full">
                                    </div>
                                    <div
                                        style={{ backgroundColor: `${x.colors?.colorB}` }}
                                        className={`bg-c max-w-[250px] aspect-r-a  min-w-40 min-h-40  bg-cover bg-center  w-full`}>
                                        <div className="h-full   bg-opacity-75 as">
                                            <div className='pl-2 relative px-1 h-full py-1 w-full'>
                                                {x.coverurl && (
                                                    <Link href={`book/${x._id}`} >
                                                        <img
                                                            className=' object-fill h-full w-full   '
                                                            src={x.coverurl} alt="" />
                                                    </Link>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full max-w-[260px]  flex flex-col justify-center text-center">
                                    <div className=" px-4 font-bold">{x.title}</div>
                                    <div className="w-full justify-end text-end gowun-batang-bold text-sm">{x.author}</div>
                                </div>
                            </div>

                        )
                    })}
                </section>
            </section>
        </div>
    );
}


export default Allbook