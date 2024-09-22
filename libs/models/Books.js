import mongoose from 'mongoose';

const BooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    coverurl: {
        type: String,
    },
    language: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
    },
    genres: {
        type: [String], // Array of strings for genres
        required: true,
    },
    versions: {
        type: [String]
    },
    series: {
        type: String,
    },
    links: {
        type: [String]
    },
    epublinks: {
        type: [String]
    },
    colors: {
        colorB: {
            type: String
        },
        colorC: {
            type: String
        }
    },
    bookdata: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
        pages: {
            type: Number, // Number of pages, assuming it's numeric
        },
        size: {
            type: Number, // Size can stay as string if it's more descriptive
        }
    }
}, { timestamps: true });

// Check if the model is already defined to avoid re-defining it
const Books = mongoose.models && mongoose.models.Books
    ? mongoose.models.Books
    : mongoose.model('Books', BooksSchema);

export default Books;
