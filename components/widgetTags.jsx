'use client'
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import UploadWidgetCdl from './UploadWidget';

const WidgetTags = ({setbookCldinfo, setbookversions, conterG}) => {

    return (
        <div className='flex items-center justify-center'> 
            <CldUploadWidget
                options={{
                    folder: 'books'
                }}
                uploadPreset="library"
                onSuccess={(result, { widget }) => {
                    if(conterG === 1) {
                        console.log(result?.info)
                        setbookCldinfo(result?.info);  // { public_id, secure_url, etc }
                        setbookversions((prevVersions) => [...prevVersions, result?.info.secure_url]);
                    } else {
                        setbookversions((prevVersions) => [...prevVersions, result?.info.secure_url]);
                    }
                }}
            >
                {({ open }) => {
                    return (
                        <div 
                        className="mt-4 w-full uppercase nerko-one-regular text-white bg-[#C5705D] text-center py-2 px-4 rounded-md hover:bg-[#ce998d] focus:outline-none focus:ring-2 focus:ring-blue-400 "
                        onClick={() => {
                            open();
                        }}>
                            Attatch PDF
                        </div>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default WidgetTags;

