'use client'
import Bookthreed from '@/components/books/bookthreed'
import PdfViewer from '@/components/pdf/pdfviewer'
import { FetchBook } from '@/libs/actions/db-actions'
import React, { useEffect, useState } from 'react'

const BookPage = ({ params }) => {

    const [book, setbook] = useState({})
    const [pdfversion, setpdfversion] = useState('')

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
        <main className='w-full min-h-screen bg-black'>

            <section className='flex'>
                <div>
                    {book.colors && (
                        <Bookthreed colorB={book.colors.colorB} colorC={book.colors.colorC} coverurl={book.coverurl} />
                    )}
                </div>
                <div className="w-full mx-auto bg-white shadow-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-6 py-4">
                        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                        <p className="text-sm text-gray-300">{book.author}</p>
                    </div>

                    <div className="px-6 py-4">
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
                                            onClick={() => setpdfversion(x)}
                                            className="bg-blue-600  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <p>pdf {i + 1}</p>
                                        </button>
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

            <section className='flex flex-col'>
                {pdfversion && (
                    <div className="w-full bg-black ">
                        <PdfViewer pdfUrl={pdfversion} />
                    </div>
                )}
            </section>
        </main>
    )
}

export default BookPage;