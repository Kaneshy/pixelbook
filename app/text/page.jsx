'use client'
import PdfViewer from '@/components/pdf/pdfviewer'
import React from 'react'

const page = () => {
  return (
    <div>
        <PdfViewer pdfUrl={'https://res.cloudinary.com/duf4dhsbs/image/upload/v1726843243/qsis49m6vxsi7p8cwlno_punznp.pdf'}  />
    </div>
  )
}

export default page