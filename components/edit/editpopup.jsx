'use client'
import { addnewcinema, EditandUpdate, FetchBook } from '@/libs/actions/db-actions';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import WidgetTags from '../widgetTags';
import { bookGenres } from '@/constants/format';
import { IoAdd } from "react-icons/io5";
import CdlimageComp from './cdlimage';
import UploadPDF from '../fbase/uploadPDF';



const Editpopup = ({ isopen, setisopen, bookId }) => {

    const [previewImage, setPreviewImage] = useState("");
    const formRef = useRef(null)
    const [bookCldinfo, setbookCldinfo] = useState([])
    const [bookversions, setbookversions] = useState([])
    const [categorieh, setcategorieh] = useState(true)
    const [selectedClothing, setSelectedClothing] = useState([]);
    const [conterG, setconterG] = useState(1)
    const [openIndexes, setOpenIndexes] = useState(Array(conterG).fill(false));
    const [colorB, setcolorB] = useState('#eeeeee')
    const [colorC, setcolorC] = useState('#c9c9c9')
    const [texta, settexta] = useState('#eeeeee')
    const [bookData, setBookData] = useState({
        id: bookId,
        title: '',
        author: '',
        summary: '',
        language: '',
        genres: [],
        colors: { colorB: '#eeeeee', colorC: '#c9c9c9' },
        links: [],
        coverurl: '',
        condition: '',
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setBookData({ ...bookData, coverurl: imageUrl })
        }
    };


    useEffect(() => {
        console.log(conterG, bookversions)
    }, [conterG])



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
        const res = await EditandUpdate(bookData, formData, bookversions, bookId)
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

    useEffect(() => {
      setBookData({ ...bookData, genres: selectedClothing })
    }, [selectedClothing])


    const toggleIndex = (index) => {
        setOpenIndexes((prev) => {
            const newOpenIndexes = [...prev];
            newOpenIndexes[index] = !newOpenIndexes[index]; // Toggle the specific index
            return newOpenIndexes;
        });
    };


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

    useEffect(() => {
      setBookData({...bookData, coverurl: previewImage})
    }, [previewImage])
    



    //fetch data

    useEffect(() => {
        const fetchData = async () => {
            const res = await FetchBook(bookId); // Assuming you fetch this from your backend
            setBookData(res);
            console.log(res)
            setPreviewImage(res.coverurl)
            setSelectedClothing(res.genres)
        };
        fetchData();
    }, [bookId]);



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
                    <div key={index} className='flex flex-col p-2 border border-slate-400 '>
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

                <div className='w-full flex flex-col gap-2'>
                    <label className="uppercase nerko-one-regular">BOOKS (for file size +10MB):</label>
                    <UploadPDF setbookversions={setbookversions} bookversions={bookversions} />
                </div>

                <div className='flex flex-col gap-4 w-full'>
                    {previewImage && (
                        <div
                            className='flex s justify-center w-full  container '>
                            <div className='flex relative shadow-c ck cc'>
                                <div
                                    style={{
                                        background: `linear-gradient(90deg, ${bookData.colors.colorB} 0%, ${bookData.colors.colorC} 10%)`,
                                    }}
                                    className=' p-2 rounded-l- h-full  '></div>
                                <div
                                    style={{ background: `linear-gradient(90deg, ${bookData.colors.colorB} 80%, ${bookData.colors.colorC} 100%)` }}
                                    className='p-1  h-full bg-[#dedede]'></div>
                                <div
                                    style={{ background: `linear-gradient(90deg, ${bookData.colors.colorB} 0%, ${bookData.colors.colorC} 10%)` }}
                                    className='p-[2px]  h-full bg-[#adadad]'></div>
                            </div>
                            <div
                                style={{ backgroundColor: `${bookData.colors.colorB}` }}
                                className={`shadow-b m-[8px] relative rounded-l-sm aspect-r-a  bg-[#661111] cg `}>

                                <img
                                    className='p-1  aspect-r-a  h-full max-h-[350px] w-full  '
                                    src={previewImage} alt="" />
                            </div>

                        </div>
                    )}
                    <div className='w-full flex flex-col gap-4'>
                        
                        <div className="flex  flex-col items-center">
                            
                            <CdlimageComp setPreviewImage={setPreviewImage} />
                        </div>
                    </div>
                </div>

                <section className='text-sm flex flex-col gap-4 right-2 '>
                    <label className="uppercase nerko-one-regular">Select colors:</label>
                    <div className='flex gap-2 items-center' >
                        <input
                            placeholder='#0000'
                            onChange={handleonchantext}
                            className='eSyDvA' type="text" />

                    </div>

                    <div className='flex justify-evenly p-4 bg-black'>
                        <input
                            type="color"
                            value={bookData.colors.colorB || '#eeeeee'}
                            onChange={(e) => setBookData({ ...bookData, colors: { ...bookData.colors, colorB: e.target.value } })}
                            className="mr-2"
                        />
                        <input
                            type="color"
                            value={bookData.colors.colorC || '#c9c9c9'}
                            onChange={(e) => setBookData({ ...bookData, colors: { ...bookData.colors, colorC: e.target.value } })}
                            className="ml-2"
                        />
                    </div>
                </section>




                <label htmlFor="title" className="uppercase nerko-one-regular">Title:</label>
                <textarea
                    placeholder="Futurama"
                    value={bookData.title || ''}
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                    id="title"
                    name="title"
                    required
                    className="border-2 border-slate-300 rounded-md p-2 min-h-10 text-black w-full focus:ring-2 focus:ring-blue-400"
                />

                <label htmlFor="author" className="uppercase nerko-one-regular">Autor:</label>
                <textarea
                    placeholder="Futurama"
                    value={bookData.author || ''}
                    onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                    id="author"
                    name="author"
                    required
                    className="border-2 border-slate-300 rounded-md p-2 min-h-10 text-black w-full focus:ring-2 focus:ring-blue-400"
                />



                <label className="uppercase nerko-one-regular">Lenguage:</label>
                <select
                    name="language"
                    value={bookData.language || 'english'}
                    onChange={(e) => setBookData({ ...bookData, language: e.target.value })}
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
                    value={bookData.condition || ''}
                    onChange={(e) => setBookData({ ...bookData, condition: e.target.value })}
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
                    value={bookData.summary || ''}
                    onChange={(e) => setBookData({ ...bookData, summary: e.target.value })}
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

export default Editpopup