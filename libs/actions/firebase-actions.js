import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';


export const handleDownload = async (pdfName) => {
    console.log(pdfName)
    try {
        const storageRef = ref(storage, `pdfs/${pdfName}`);
        const url = await getDownloadURL(storageRef);
        console.log(url)
        return url
    } catch (error) {
        console.log(error)
    }
};