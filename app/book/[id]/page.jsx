'use client'
import Bookthreed from '@/components/books/bookthreed'
import EditPage from '@/components/edit/edit'
import DeliverPDF from '@/components/fbase/deliverPDF'
import UploadPDF from '@/components/fbase/uploadPDF'
import PdfViewer from '@/components/pdf/pdfviewer'
import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import { FetchBook } from '@/libs/actions/db-actions'
import { handleDownload } from '@/libs/actions/firebase-actions'
import React, { useEffect, useState } from 'react'

const BookPage = ({ params }) => {

    const [book, setbook] = useState({})
    const [pdfversion, setpdfversion] = useState('')
    const [openedit, setopenedit] = useState(false)

    const handleViewPdf = async (x) => {
        console.log(33, x)
        if (x.startsWith("https://firebasestorage.googleapis.com")) {
            try {
                setopenedit(true)
                setpdfversion(x)
            } catch (error) {
                console.log(error)
            }

        } else {
            setopenedit(false)
            setpdfversion(x)
        }
    }

    const handleDownload = async (pdfName) => {
        console.log(pdfName)

    };


    useEffect(() => {
        const fetchbook = async () => {
            const res = await FetchBook(params.id)
            setbook(res)
            setpdfversion(res.versions && res.versions.length > 0 ? res.versions[0] : '')
            console.log(res.versions && res.versions[0])
            console.log(res)
        }
        fetchbook()
    }, [params.id])



    return (
        <>
            <main 
            style={{ background: `linear-gradient(90deg, ${book.colors?.colorB} 20%, ${book.colors?.colorC} 70%)` }}
            className='w-full min-h-screen '>
                <div className="sticky bg-blur-sm text-white bg-black  bg-opacity-30 top-0 z-50">
                    <Navbar />
                </div>

                <section className='flex max-sm:flex-col'>
                    <div className=''>
                        {book.colors && (
                            <Bookthreed colorB={book.colors.colorB} colorC={book.colors.colorC} coverurl={book.coverurl} />
                        )}
                    </div>
                    <div className="w-full mx-auto  shadow-lg overflow-hidden">
                        {book.colors && (
                            <div
                               
                                className={` text-gray-400 px-6 py-4`}>
                                <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                                <p className="text-sm text-gray-600">{book.author}</p>
                            </div>)}

                        <div className='w-full flex p-2'>
                            <EditPage bookId={book._id} />
                        </div>
                        <div className="px-6 py-4 bg-white"
                        >
                            <div className="flex items-center mb-4">
                                <span className="text-gray-600 font-semibold">Language: </span>
                                <span className="ml-2 text-gray-800">{book.language}</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <span className="text-gray-600 font-semibold">Condition: </span>
                                <span className="ml-2 text-gray-800">{book.condition}</span>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-600 font-semibold">Summary:</p>
                                <p className="mt-2 text-gray-700 text-sm">{book.summary}</p>
                            </div>
                            <div className='mb-4'>
                                <p className="text-gray-600 font-semibold">Genres:</p>
                                <div className="flex flex-wrap mt-2">
                                    {book.genres?.map((x, i) => (
                                        <span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                            {x}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-2 flex flex-col gap-2">
                                <p className="text-gray-600 font-semibold">Read PDF:</p>
                                <div className="px-2 flex gap-2 py-4 bg-gray-50">
                                    {book.versions && book.versions.map((x, i) => {
                                        return (
                                            <button
                                                key={`book${i}`}
                                                onClick={() => handleViewPdf(x)}
                                                className="bg-blue-600  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                <p>pdf {i + 1}</p>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="mb-2 flex flex-col gap-2">
                                <p className="text-gray-600 font-semibold">Download PDF:</p>
                                <div className="px-2 flex gap-2 py-4 bg-gray-50">
                                    {book.versions && book.versions.map((x, i) => {
                                        return (
                                            <a
                                                href={x}
                                                target='_blank'
                                                key={`book${i}`}
                                                className="bg-blue-600  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                <p>pdf {i + 1}</p>
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="mb-2 flex flex-col gap-2">
                                <p className="text-gray-600 font-semibold">Download epub:</p>
                                <div className="px-2 flex gap-2 py-4 bg-gray-50">
                                    {book.epublinks && book.epublinks?.map((x, i) => {
                                        return (
                                            <a
                                                key={`epublinks${i}`}
                                                target='_blank'
                                                href={x}
                                                className="bg-blue-600 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                <p>epub {i + 1}</p>
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="mb-4 flex flex-col gap-2">
                                <p className="text-gray-600 font-semibold">More links</p>
                                <div className="px-2 flex gap-2 py-4 bg-gray-50">
                                    {book.links && book.links?.map((x, i) => {
                                        return (
                                            <a
                                                key={`links${i}`}
                                                target='_blank'
                                                href={x}
                                                className="bg-blue-600 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                <p>Drive {i + 1}</p>
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {pdfversion ? (
                    openedit ? (
                        <section className="flex flex-col">
                            <div>
                                <DeliverPDF pdfversion={pdfversion} />
                            </div>
                        </section>
                    ) : (
                        <section className="flex flex-col">
                            <div>
                                <div className="w-full bg-black">
                                    <PdfViewer pdfUrl={pdfversion} />
                                </div>
                            </div>
                        </section>
                    )
                ) : (
                    <p>No PDF version available.</p>
                )}
            </main>
            <Footer color={'#000'} />
        </>
    )
}

export default BookPage;