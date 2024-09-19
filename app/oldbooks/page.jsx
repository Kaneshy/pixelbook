'use client'
import React, { useEffect, useState } from 'react'

const Testpage = () => {

    const [categories, setCategories] = useState([]);
    const [colorB, setcolorB] = useState('#eeeeee')
    const [colorC, setcolorC] = useState('#c9c9c9')
    const [texta, settexta] = useState('#eeeeee')

    useEffect(() => {
        const fetchCategories = async () => {
            console.log('fetching...')
        };

        fetchCategories();
    }, []);

    const handleonchangecolor = (e) => {
        console.log(e.target.value)
        setcolorB(e.target.value)
    }
    const handleonchangecolorb = (e) => {
        console.log(e.target.value)
        setcolorC(e.target.value)
    }

    const handleonchantext = (e) => {
        handleonchangecolor(e)
        handleonchangecolorb(e)
        console.log(e.target.value)
        settexta(e.target.value)
    }


    useEffect(() => {

    }, [colorB, colorC])

    useEffect(() => {

    }, [texta])



    return (
        <>
            {/* <section className=" pb-12 bg-[#dedede]">
                <section className="grid-b p-4 ">
                    {array.map((x) => {
                        return (
                            <div className=" min-w-40 min-h-40 bg-[url('https://res.cloudinary.com/dztz492su/image/upload/v1726527864/books/xvempfw5gq5laqh5ihu3.jpg')] bg-cover bg-center  w-full">
                                <div className="p-2  bg-opacity-75 h-[450px] transition-all duration-300 transform">
                                    <p className=" text-white text-2xl anton-regular uppercase">title</p>
                                </div>

                            </div>

                        )
                    })}
                </section>
            </section> */}



            <section className=" pb-12 mt-24 bg-[#DEDEDE]  select-none">
                <section className="grid-b p-4 ">
                    {categories.map((x, i) => {
                        return (
                            <div
                                className='flex s  container max-w-[300px]'>
                                <div className='flex relative shadow-c ck cc'>
                                    <div
                                        style={{ 
                                            background: `linear-gradient(90deg, ${colorB} 0%, ${colorC} 10%)`,
                                         }}
                                        className=' p-2 rounded-l- h-full  '></div>
                                    <div
                                        style={{ background: `linear-gradient(90deg, ${colorB} 80%, ${colorC} 100%)` }}
                                        className='p-1  h-full bg-[#dedede]'></div>
                                    <div
                                        style={{ background: `linear-gradient(90deg, ${colorB} 0%, ${colorC} 10%)` }}
                                        className='p-[2px]  h-full bg-[#adadad]'></div>
                                </div>
                                <div
                                    style={{ backgroundColor: `${colorB}` }}
                                    className={`shadow-b m-[8px] relative rounded-l-sm aspect-r-a  bg-[#661111] cg `}>
                                   
                                    <img
                                        className='p-1  aspect-r-a  h-full max-h-[350px] w-full  '
                                        src={x.imgUrl} alt="" />
                                </div>

                            </div>

                        )
                    })}
                </section>
            </section>




            <section className=" pb-12 mt-24 bg-[#dedede] select-none">
                <section className="grid-b p-4 ">
                    {categories.map((x, i) => {
                        return (
                            <div className='p-4 s flex justify-center items-center '>

                                <div className="bg-[url('https://res.cloudinary.com/dztz492su/image/upload/v1726527571/books/mpnpjtdeotpe2ie4ytms.jpg')] max-w-[300px] aspect-r-a  min-w-40 min-h-40  bg-cover bg-center  w-full">
                                    <div className="h-full container p-2 bg-white  bg-opacity-5">
                                        <div className='pl-2  cg px-1 h-full py-1 w-full'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </section>

            <section className=" pb-12 mt-24 bg-[#dedede] select-none">
                <section className="grid-b p-4 ">
                    {categories.map((x, i) => {
                        return (
                            <div className='p-4 s flex justify-center items-center '>
                                <div
                                    style={{ background: "linear-gradient(90deg, #eeeeee 40%, #c9c9c9 100%)" }}
                                    className=" rounded-l-sm max-w-[10px] h-full bg-cover bg-center  w-full">

                                </div>
                                <div className="bg-c max-w-[300px] aspect-r-a  min-w-40 min-h-40 bg-[#eeeeee] bg-cover bg-center  w-full">
                                    <div className="h-full   bg-opacity-75 as">
                                        <div className='pl-2  px-1 h-full py-1 w-full'>
                                            <img
                                                className=' object-fill h-full w-full   '
                                                src={x.imgUrl} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </section>
            <section className='fixed text-sm z-50 bottom-2 flex flex-col gap-4 right-2 bg-zinc-500'>

                <div className='flex gap-2 items-center' >
                    <input
                        placeholder='#0000'
                        onChange={handleonchantext}
                        className='eSyDvA' type="text" />
                    <input
                        className=' bg-black'
                        onChange={handleonchangecolor}
                        type="color"
                        value={texta}
                    />
                </div>
                <div >
                    <input
                        onChange={handleonchangecolorb}
                        value={texta}
                        type="color" name="" id="" />
                </div>
            </section>




            <section className=" pb-12 mt-24 bg-[#dedede] select-none">
                <section className="grid-b p-4 ">
                    {categories.map((x, i) => {
                        return (
                            <div className='p-4 s relative flex justify-center items-center '>

                                <div className='z-50 absolute top-0 right-0 h-16 w-16'>
                                    <img src="https://res.cloudinary.com/dztz492su/image/upload/v1726548808/books/vb7zvw9u60yudh3madtz.png" alt="" />
                                </div>



                                <div
                                    style={{ background: `linear-gradient(90deg, ${colorB} 40%, ${colorC} 100%)` }}
                                    className=" rounded-l-sm max-w-[10px] h-full bg-cover bg-center  w-full">

                                </div>
                                <div
                                    style={{ backgroundColor: `${colorB}` }}
                                    className={`bg-c max-w-[300px] aspect-r-a  min-w-40 min-h-40  bg-cover bg-center  w-full`}>
                                    <div className="h-full   bg-opacity-75 as">
                                        <div className='pl-2 relative px-1 h-full py-1 w-full'>
                                            <img
                                                className=' object-fill h-full w-full   '
                                                src={x.imgUrl} alt="" />

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </section>

        </>

    )
}

export default Testpage