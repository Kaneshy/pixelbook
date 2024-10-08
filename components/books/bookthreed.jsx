import React from 'react'

const Bookthreed = ({colorB, colorC, coverurl}) => {
    return (
        <section className="max-sm:min-w-[100px]  min-w-[350px] h-full bg-[#ffffff]  select-none flex items-center justify-center">
            <div
                className='flex s p-4 justify-center container '>
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
                        src={coverurl} alt="" />
                </div>

            </div>
        </section>
    )
}

export default Bookthreed