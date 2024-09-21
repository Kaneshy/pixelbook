'use client'
import { addnewcinema } from '@/libs/actions/db-actions';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { bookGenres } from '@/constants/format';
import { IoAdd } from "react-icons/io5";
import WidgetTags from '../widgetTags';



const Cinemapopup = ({ isopen, setisopen }) => {

    const [previewImage, setPreviewImage] = useState("");
    const formRef = useRef(null)
    const [bookCldinfo, setbookCldinfo] = useState([])
    const [bookversions, setbookversions] = useState([])
    const [categorieh, setcategorieh] = useState(true)
    const [selectedClothing, setSelectedClothing] = useState([]);
    const [conterG, setconterG] = useState(1)
    const [openIndexes, setOpenIndexes] = useState(Array(conterG).fill(false));

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    useEffect(() => {
        if (bookCldinfo.secure_url) {
            setPreviewImage(bookCldinfo.secure_url.replace(".pdf", ".jpg"))
        }
    }, [bookCldinfo])

    useEffect(() => {
        console.log(conterG, bookversions)
    }, [conterG])

    useEffect(() => {
      
        
    
      return () => {
        second
      }
    }, [third])
    



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setisopen(false); // Close the form
            }
        };

        // Add event listener to detect clicks outside the form
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setisopen]);

    const sendDataActions = async (formData) => {
        const res = await addnewcinema(formData, bookCldinfo, selectedClothing, bookversions)
    }


    const handleClothingSelection = (clothing) => {
        if (selectedClothing.includes(clothing)) {
            // Si la prenda ya está seleccionada, la quitamos de la selección
            setSelectedClothing(selectedClothing.filter(item => item !== clothing));
        } else {
            // Si la prenda no está seleccionada, la añadimos a la selección
            setSelectedClothing([...selectedClothing, clothing]);
        }
    }

    const toggleIndex = (index) => {
        setOpenIndexes((prev) => {
            const newOpenIndexes = [...prev];
            newOpenIndexes[index] = !newOpenIndexes[index]; // Toggle the specific index
            return newOpenIndexes;
        });
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
            <form
                ref={formRef}
                action={sendDataActions}
                className="text-zinc-800  relative scrollbar-b flex flex-col gap-y-4 p-6 bg-[#F8EDE3] rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
                <div
                    onClick={() => setisopen(!isopen)}
                    className='absolute top-2 right-2 p-2 rounded-full hover:scale-110'>
                    <IoMdClose size={24} />
                </div>
                <label className=" uppercase nerko-one-regular border-b border-slate-400 pb-2 text-center text-lg">NEW BOOK</label>



                {Array.from({ length: conterG }).map((_, index) => (
                    <div key={index} className='flex flex-col'>
                        <label className="uppercase nerko-one-regular">Book (pdf):</label>
                        {bookCldinfo.display_name && (
                            <div className='w-full p-2 text-center rounded-lg bg-[#f7dfc9]'>{bookCldinfo.display_name}</div>
                        )}
                        <WidgetTags setbookCldinfo={setbookCldinfo} setbookversions={setbookversions} conterG={conterG} />
                        <div className='p-1 gap-1 text-end nerko-one-regular text-sm text-zinc-500 flex justify-end'>
                            <label className="flex-grow">File size must not exceed 10 MB</label>
                            <div
                                onClick={() => toggleIndex(index)} // Toggle the specific index
                                className='px-2 cursor-pointer rounded-lg text-[#ae62cc]'
                            >
                                second option
                            </div>
                        </div>
                        {openIndexes[index] && ( // Only show if this index is open
                            <div>
                                <label htmlFor="link" className="uppercase nerko-one-regular">Link:</label>
                                <input
                                    placeholder="http://futurama.pdf"
                                    id="link"
                                    name="link"
                                    className="border-2 border-slate-300 rounded-md p-2 text-black w-full focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        )}
                    </div>
                ))}

                <div className='w-full gap-4 flex items-center justify-center'>
                    <label className="uppercase nerko-one-regular">More PDF versions? </label>
                    <div
                        onClick={() => setconterG(conterG + 1)}
                        className={'text-white p-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 border border-transparent transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-purple-500'}
                    >
                        <IoAdd size={30} />
                    </div>
                </div>



                <div className='flex flex-col gap-4'>
                    {previewImage && (
                        <img src={previewImage} alt="Selected" className="max-w-full h-auto rounded-md shadow-lg mb-4" />
                    )}
                    <div className='w-full flex flex-col gap-4'>
                        <label
                            htmlFor="image"
                            className="mt-4  uppercase nerko-one-regular text-white bg-[#C5705D] text-center py-2 px-4 rounded-md hover:bg-[#ce998d] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            NEW COVER
                        </label>
                        <div className="flex  flex-col items-center">
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                name="image"
                                accept="image/*"
                                className="hidden"
                            />

                        </div>
                    </div>
                </div>




                <label htmlFor="title" className="uppercase nerko-one-regular">Title:</label>
                <textarea
                    placeholder="Futurama"
                    id="title"
                    name="title"
                    required
                    className="border-2 border-slate-300 rounded-md p-2 min-h-10 text-black w-full focus:ring-2 focus:ring-blue-400"
                />

                <label htmlFor="author" className="uppercase nerko-one-regular">Autor:</label>
                <textarea
                    placeholder="Futurama"
                    id="author"
                    name="author"
                    required
                    className="border-2 border-slate-300 rounded-md p-2 min-h-10 text-black w-full focus:ring-2 focus:ring-blue-400"
                />



                <label className="uppercase nerko-one-regular">Lenguage:</label>
                <select
                    name="language"
                    className="border-2 uppercase nerko-one-regular rounded-md p-2  bg-[#C5705D] w-full  focus:ring-[#C5705D]"
                >
                    <option value="english">english</option>
                    <option value="spanish">spanish</option>
                    <option value="french">french</option>
                    <option value="other">other</option>

                </select>

                <label className="uppercase nerko-one-regular">Categorie:</label>
                <section className='w-full flex flex-row max-[350px]:flex-col justify-between'>
                    <div
                        className={` ${categorieh ? 'bg-[#ae62cc] text-white' : 'bg-[#C5705D]'}  border-2 uppercase nerko-one-regular rounded-md p-2   w-full  `}
                        onClick={() => {
                            setcategorieh(true);
                            setSelectedClothing([]);
                        }}
                    >literature</div>
                    <div
                        className={` ${categorieh ? 'bg-[#C5705D]' : ' bg-[#ae62cc] text-white'}  border-2 uppercase nerko-one-regular rounded-md p-2   w-full  `}
                        onClick={() => {
                            setcategorieh(false);
                            setSelectedClothing([]);
                        }}
                    >science</div>

                </section>



                <section className="mb-4 border-gray-500 border p-2 w-full">
                    <div className="mb-4 border-gray-500 border p-2 w-full">
                        <h3 className='uppercase nerko-one-regular'>Genres:</h3>
                    </div>
                    <div className="mb-4  border-gray-500 border select-none  p-2 w-full">
                        <div className="w-full flex flex-wrap">
                            {selectedClothing.map((item, index) => (
                                <div
                                    style={{ margin: '5px' }}
                                    onClick={() => handleClothingSelection(item)}
                                    className="p-2 rounded bg-neutral-700 text-white" key={`selectedClothing${index * 5}`}>{item}</div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4 border-gray-500 border   p-2 w-full">
                        <div className='w-full flex flex-wrap'>

                            {categorieh ? (
                                bookGenres[0].literature.map((clothing, index) => (
                                    <div
                                        key={`prendas${index * 8}`}
                                        style={{ margin: '5px' }}
                                        onClick={() => handleClothingSelection(clothing)}
                                        className={`${selectedClothing.includes(clothing) ? 'selected' : ''} cursor-grab`}
                                    >
                                        <p className="p-2 rounded bg-neutral-700 text-white">{clothing}</p>
                                    </div>
                                ))
                            ) : (
                                bookGenres[0].science.map((clothing, index) => (
                                    <div
                                        key={`action${index * 8}`}
                                        style={{ margin: '5px' }}
                                        onClick={() => handleClothingSelection(clothing)}
                                        className={`${selectedClothing.includes(clothing) ? 'selected' : ''} cursor-grab`}
                                    >
                                        <p className="p-2 rounded bg-neutral-700 text-white">{clothing}</p>
                                    </div>
                                ))
                            )}


                        </div>
                    </div>
                </section>






                <label htmlFor='condition' className="uppercase nerko-one-regular">Condition:</label>
                <select
                    name="condition"
                    className="border-2 uppercase nerko-one-regular rounded-md p-2  bg-[#C5705D] w-full  focus:ring-[#C5705D]"
                >
                    <option value="ilustrated">ilustrated book</option>
                    <option value="book">book</option>
                    <option value="copy">copy</option>

                </select>
                <section className='p-1 border border-zinc-600 flex flex-col w-full'>
                    <label htmlFor='series' className="uppercase nerko-one-regular">Series:</label>
                    <div className='flex flex-col gap-2 p-2'>
                        <label htmlFor='series' className="uppercase nerko-one-regular">Series Name:</label>
                        <input
                            type="text"
                            placeholder="Harry Potter"
                            id="series"
                            name="series"
                            className="border-2 uppercase  border-slate-300 rounded-md p-2 text-black w-full focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </section>



                <label htmlFor="summary" className="uppercase nerko-one-regular">Summary:</label>
                <textarea
                    type="text"
                    placeholder="1"
                    id="summary"
                    name="summary"
                    className="border-2 min-h-36 border-slate-300 rounded-md p-2 text-black w-full focus:ring-2 focus:ring-blue-400"
                />


                <button
                    type="submit"
                    className="mt-4 uppercase nerko-one-regular bg-[#C5705D] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full"
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default Cinemapopup