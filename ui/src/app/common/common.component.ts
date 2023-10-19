export interface Author{
    _id: string;
    name: string;
}

export interface Book {
    _id: string;
    title: string;
    authorId: string;
    categoryId: string;
    shelf: string;
    quantity: number;
}

export interface Category{
    _id: string;
    name: string;
}

export interface Role {
    _id: string,
    name: string,
}

export interface User {
    _id: string,
    username: string,
    roleId: string,
    name: string,
}

export interface Ticket {
    _id: string,
    book: Book,
    borrower: User,
    borrowedDate: string,
    expectReturnDate: string,
    returnDate: string
}
