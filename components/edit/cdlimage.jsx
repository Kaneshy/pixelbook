'use client'
import { CldUploadWidget } from 'next-cloudinary';

const CdlimageComp = ({ setPreviewImage }) => {

    return (
        <div className='flex items-center justify-center'>
            <CldUploadWidget
                options={{
                    folder: 'books'
                }}
                uploadPreset="library"
                onSuccess={(result, { widget }) => {
                    console.log(result?.info.secure_url)
                    setPreviewImage(result.info.secure_url)
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

export default CdlimageComp;

