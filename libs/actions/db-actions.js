'use server'
import cloudinary from 'cloudinary'
import { uploadImageToCloudinary } from './cloudinary-actions';
import Books from '../models/Books';
import { connectToDB } from '../mongoose';


export const EditandUpdate = async (bookData, formData, bookversions, bookId) => {





    let links = formData.getAll('link').filter(item => item !== '');

    const pdflinks = links.filter(file => file.endsWith('.pdf'));
    const pdfFiles = bookversions.filter(file => file.endsWith('.pdf'));

    const epublinks = links.filter(file => file.endsWith('.epub'));
    const epubFiles = bookversions.filter(file => file.endsWith('.epub'));

    const moreLinks = links.filter(file => !file.endsWith('.pdf') && !file.endsWith('.epub'));

    // Combine PDF and EPUB arrays
    const allPDFs = [...pdflinks, ...pdfFiles, ...bookData.versions];
    const allEPUBs = [...epublinks, ...epubFiles, ...bookData.epublinks];

    const allLinks = [...(bookData.links || []), ...moreLinks];
    console.log(55, allLinks)

    let coverUrl;

    await connectToDB(); // Ensure database connection

    console.log(bookData)

    const {
        title,
        author,
        coverurl,
        language,
        condition,
        summary,
        genres,
        colors,
        bookdata
    } = bookData;
    console.log(99, bookData)


    try {
        const newBook = await Books.findByIdAndUpdate(bookId, {
            title,
            author,
            coverurl, // Save the Cloudinary image URL
            language,
            condition,
            summary,
            genres,
            versions: allPDFs,
            links: moreLinks,
            colors,
            epublinks: allEPUBs,
            bookdata
        });

        console.log('New book created:', newBook);
        return true; // Indicate success
    } catch (err) {
        console.error('Error creating book:', err.message);
        return null; // Handle error accordingly
    }

}

export const FetchBook = async (bookId) => {
    console.log('Fetching book...', bookId);

    await connectToDB();

    try {
        console.log('Running query');
        const book = await Books.findById(bookId).lean(); // Get plain JS object

        if (!book) {
            throw new Error('Book not found');
        }
        const data = JSON.parse(JSON.stringify(book))
        return data; // Return the transformed book
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: 'Error fetching book', error: err.message }, { status: 500 });
    }
};

export const FetchAllBooks = async () => {
    console.log('Fetching books...');

    await connectToDB();

    try {
        console.log('Running query');
        const books = await Books.find().sort({ title: 1 }).lean(); // Use .lean() to get plain JS objects

        // Transform each book document to ensure _id and date fields are plain values
        const transformedBooks = books.map(book => ({
            ...book,
            _id: book._id.toString(), // Convert ObjectId to string
            createdAt: book.createdAt ? book.createdAt.toISOString() : null, // Convert Date to string
            updatedAt: book.updatedAt ? book.updatedAt.toISOString() : null // Convert Date to string
        }));

        console.log(30, transformedBooks);
        return transformedBooks; // Return plain, serialized data
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: 'Error fetching books', error: err.message }, { status: 500 });
    }
};


export const addnewcinema = async (formData, bookCldinfo, selectedClothing, bookversions, colorB, colorC) => {
    // Destructure form data
    const {
        title,
        author,
        image,
        language,
        condition,
        series,
        summary,
    } = Object.fromEntries(formData.entries());


    let links = formData.getAll('link').filter(item => item !== '');
    // Ensure links is always an array
    if (links.length === 0) {
        links = []; // No links provided
    }
    
    // Filter for URLs containing '.pdf'
    const pdflinks = links.filter(file => file.includes('.pdf'));
    const pdfFiles = Object.values(bookversions).filter(file => file.includes('.pdf'));

    // Filter for URLs containing '.epub'
    const epublinks = links.filter(file => file.includes('.epub'));
    const epubFiles = Object.values(bookversions).filter(file => file.includes('.epub'));

    // Filter for URLs that do not contain '.pdf' or '.epub'
    const moreLinks = links.filter(file => !file.includes('.pdf') && !file.includes('.epub'));


    // Combine PDF and EPUB arrays
    const allPDFs = [...pdflinks, ...pdfFiles];
    const allEPUBs = [...epublinks, ...epubFiles];

    let coverUrl;

    if (image.size === 0) {
        coverUrl = bookCldinfo.secure_url.replace(".pdf", ".jpg");
        console.log(616, coverUrl);
    } else {
        try {
            coverUrl = await uploadImageToCloudinary(image);
        } catch (err) {
            console.error('Error uploading image to Cloudinary:', err.message);
            return null; // Handle image upload failure
        }
    }


    const {
        public_id: bookPublicId,
        secure_url: bookSecureUrl,
        pages: bookPages,
        bytes: bookSize,
    } = bookCldinfo;

    const genres = selectedClothing;

    await connectToDB(); // Ensure database connection

    try {
        const newBook = await Books.create({
            title,
            author,
            coverurl: coverUrl, // Save the Cloudinary image URL
            language,
            condition,
            summary,
            genres,
            versions: allPDFs,
            links: moreLinks,
            series,
            colors: {
                colorB,
                colorC,
            },
            epublinks: allEPUBs,
            bookdata: {
                public_id: bookPublicId,
                secure_url: bookSecureUrl,
                pages: bookPages,
                size: bookSize,
            }
        });

        console.log('New book created:', newBook);
        return true; // Indicate success
    } catch (err) {
        console.error('Error creating book:', err.message);
        return null; // Handle error accordingly
    }
};