// components/UploadPDF.js
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';

const UploadPDF = ({ setbookversions, bookversions }) => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        // Determine the folder based on the file extension
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let folder = '';

        if (fileExtension === 'pdf') {
            folder = 'pdfs';
        } else if (fileExtension === 'epub') {
            folder = 'epubs';
        } else {
            console.error('Unsupported file type. Only PDF and EPUB files are allowed.');
            return;
        }

        // Create a reference in the appropriate folder
        const storageRef = ref(storage, `${folder}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setDownloadURL(url);
                    console.log(url);

                    // Update bookversions with the uploaded file URL
                    setbookversions((prevVersions) => ({
                        ...prevVersions,
                        [Object.keys(prevVersions).length]: url  // Adding the URL as a new key-value pair
                    }));
                });
            }
        );
    };

    return (
        <div className="w-full p-6 border border-zinc-400 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload PDF</h2>
            <input
                type="file"
                accept=".pdf, .epub"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100"
            />
            <div
                onClick={handleUpload}
                disabled={!file}
                className={`mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg
        font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 
        focus:ring-opacity-50 transition-all ${!file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                    }`}
            >
                Upload
            </div>

            {uploadProgress > 0 && (
                <p className="mt-4 text-sm text-gray-600">
                    Upload progress: {uploadProgress.toFixed(2)}%
                </p>
            )}

            {downloadURL && (
                <p className="mt-4 text-sm text-green-600">
                    File uploaded successfully!{' '}
                    <a
                        href={downloadURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                    >
                        Download here
                    </a>
                </p>
            )}
        </div>
    );
};

export default UploadPDF;


