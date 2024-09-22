
// components/DeliverPDF.js
import React, { useState } from 'react';
import { storage } from '../firebase'; // Import your Firebase storage instance
import { ref, getDownloadURL } from 'firebase/storage';

const DeliverPDF = () => {
  const [pdfURL, setPdfURL] = useState('');
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async (pdfName) => {
    try {
      const storageRef = ref(storage, `pdfs/${pdfName}`);
      const url = await getDownloadURL(storageRef);
      setPdfURL(url);
    } catch (error) {
      setDownloadError(error.message);
    }
  };

  return (
    <div>
      <h2>Deliver PDF</h2>
      <input
        type="text"
        placeholder="Enter PDF name"
        onChange={(e) => setPdfURL(e.target.value)}
      />
      <button onClick={() => handleDownload(pdfURL)}>Download</button>
      {pdfURL && (
        <a href={pdfURL} target="_blank">
          Download PDF
        </a>
      )}
      {downloadError && <p>Error: {downloadError}</p>}
    </div>
  );
};

export default DeliverPDF;