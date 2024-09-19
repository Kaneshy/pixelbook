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
    bookdata: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
        pages: {
            type: Number, // Number of pages, assuming it's numeric
            required: true,
        },
        size: {
            type: Number, // Size can stay as string if it's more descriptive
            required: true,
        }
    }
}, { timestamps: true });

// Check if the model is already defined to avoid re-defining it
const Books = mongoose.models && mongoose.models.Books
    ? mongoose.models.Books
    : mongoose.model('Books', BooksSchema);

export default Books;