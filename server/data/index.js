import mongoose from "mongoose";


const authorIds  = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];
const categoryIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];
const bookIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const authors = [
    {
        __id: authorIds[0],
        name: 'Mr Anon'
    },
    {
        __id: authorIds[1],
        name: 'Mrs Anon'
    }
];
export const categories = [
    {
        __id: categoryIds[0],
        name: 'Web Development'
    },
    {
        __id: categoryIds[1],
        name: 'Programming'
    },
    {
        __id: categoryIds[2],
        name: 'Database'
    },
    {
        __id: categoryIds[3],
        name: 'Administration'
    },
];
export const books = [
    {
        __id: bookIds[0],
        title: 'Python for SAS Users',
        authorId: authorIds[0],
        categoryId: categoryIds[0],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[1],
        title: 'Deep Learning with JavaScript',
        authorId: authorIds[0],
        categoryId: categoryIds[0],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[2],
        title: 'Problem Solving with C++',
        authorId: authorIds[0],
        categoryId: categoryIds[1],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[3],
        title: 'Python for Informatics',
        authorId: authorIds[0],
        categoryId: categoryIds[1],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[4],
        title: 'SQL Server Big Data Clusters',
        authorId: authorIds[0],
        categoryId: categoryIds[2],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[5],
        title: 'Refactoring Legacy T-SQL for Improved Performance',
        authorId: authorIds[1],
        categoryId: categoryIds[2],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[6],
        title: 'The Definitive Guide to AWS Application Integration',
        authorId: authorIds[1],
        categoryId: categoryIds[2],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[7],
        title: 'Python for SAS Users',
        authorId: authorIds[1],
        categoryId: categoryIds[3],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[8],
        title: 'Professional Outlook 2007 Programming',
        authorId: authorIds[1],
        categoryId: categoryIds[3],
        shelf: '',
        quantity: 1
    },
    {
        __id: bookIds[9],
        title: 'VMware vSphere For Dummies',
        authorId: authorIds[0],
        categoryId: categoryIds[3],
        shelf: '',
        quantity: 1
    },

];