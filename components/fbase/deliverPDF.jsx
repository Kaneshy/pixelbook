
// components/DeliverPDF.js
import React, { useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';

const DeliverPDF = ({ pdfversion }) => {
  const [pdfURL, setPdfURL] = useState('');
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async (pdfName) => {
    try {
      const storageRef = ref(storage, `pdfs/${pdfName}`);
      const url = await getDownloadURL(storageRef);
      console.log(44666666666, url)
      setPdfURL(url);
    } catch (error) {
      setDownloadError(error.message);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <a className='p-2 bg-zinc-800 text-zinc-400' href={pdfversion} target="_blank">
        Download PDF
      </a>
      <div className='w-full flex justify-center  min-h-screen'>
        <iframe className='w-full min-h-screen  max-w-[1200px]' src={pdfversion} ></iframe>
      </div>
    </div>
  );
};

export default DeliverPDF;