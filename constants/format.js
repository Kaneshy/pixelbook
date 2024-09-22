import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";



export const bookGenres = [
    {
        literature: [
            "Fiction",
            "Non-fiction",
            "Fantasy",
            "Science Fiction",
            "Mystery",
            "Thriller",
            "Romance",
            "Historical Fiction",
            "Biography",
            "Self-help",
            "Horror",
            "Adventure",
            "Dystopian",
            "Young Adult",
            "Classic",
            "Graphic Novel",
            "Memoir",
            "Poetry",
            "Crime",
            "Drama",
            "Gothic",
            "bonds and connections ",
            "Children",
            "Historical fiction"


        ],
        science: [
            "Physics",
            "Chemistry",
            "Biology",
            "Mathematics",
            "Astronomy",
            "Geology",
            "Computer Science",
            "Engineering",
            "Medicine",
            "Psychology",
            "Genetics",
            "Neuroscience",

        ]
    }

];



export const formatarraybooks = [
    {
        title: 'the little prince',
        autor: 'Antoine De Sint ',
        cover: 'https://firebasestorage.googleapis.com/v0/b/books-reader-c7c96.appspot.com/o/images%2F1-2.jpg?alt=media&token=25008f08-da0b-4268-a96c-b52fdbd2a4e8',
        genres: '',
        desc: 'ilustrated, book, pdf',
        summary: '',
        language: '',
        link: '',
        notes: [],
        versions: [
            {
                desc: '',
                cover: '',
                language: '',
                link: '',
            },
            {
                desc: '',
                cover: '',
                language: '',
                link: '',
            }
        ]
    }
]

export const formatgenresbooks = [
    {
        title: '',
        desc: '',
        imgurl: '',
        backgroundimg: '',
    }
]


export const bottonBarC = [
    {
        name: 'Videos',
        route: '/categorieVideo/All',
        logo: <CiVideoOn size={24} />
    },
    {
        name: 'Pictures ',
        route: '/categorie/All',
        logo: <CiImageOn size={24} />
    },
    {
        name: 'Folders',
        route: '/profile/a',
        logo: <CiFolderOn size={24} />
    }

]


