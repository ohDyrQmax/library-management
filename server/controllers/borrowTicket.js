import Book from "../models/Book.js";
import BorrowTicket from "../models/BorrowTicket.js";
import moment from "moment";
import keyBy from "lodash/keyBy.js";


const datetimeFormat = "MMMM Do YYYY";

/* create */
export const createBorrowTicket = async (req, res) => {
    try {
        let { user } = req.user;
        let { book, borrowedDate, expectReturnDate } = req.body;
        let selectedBook = await Book.findById(book._id);
        if (selectedBook.quantity < 1) return res.status(400).json({message: `${selectedBook.title} is currently unavailable.`});

        borrowedDate = moment(new Date(borrowedDate)).format(datetimeFormat);
        expectReturnDate = moment(new Date(expectReturnDate)).format(datetimeFormat);

        let newBorrowTicket = new BorrowTicket({
            book: book,
            borrower: user,
            borrowedDate: borrowedDate,
            expectReturnDate: expectReturnDate,
        });
        await newBorrowTicket.save();

        selectedBook.quantity -= 1;
        selectedBook.save();

        return res.status(200).json(newBorrowTicket);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.error || error});
    }
}

/* read */
export const getTicketList = async (req, res) => {
    try {
        let { borrower, title } = req.query || req.params;

        let tickets = await BorrowTicket.find().populate("borrower").populate("book");
        let filteredTickets = tickets.filter(function (ticket) {
            return ticket.borrower.name.toLowerCase().includes(borrower) && ticket.book.title.toLowerCase().includes(title)
        });

        res.status(200).json(keyBy(filteredTickets, '_id'));
    } catch (error) {
        res.status(error.status || 500).json({error: error.error || error});
    }
}

export const getTicketByUserId = async (req, res) => {
    try {
        let { user } = req.user;
        let tickets = await BorrowTicket.find({ borrower: user }).populate("borrower").populate("book");
        return res.status(200).json(keyBy(tickets, "_id"));
    } catch (error) {
        return res.status(error.status || 500).json({error: error.error || error});
    }
}

/* update */
export const updateTicketReturnDateById = async (req, res) => {
    try {
        let { id } = req.params || req.query;
        let ticket = await BorrowTicket.findById(id);
        ticket.returnDate = moment().format(datetimeFormat);

        let selectedBook = await Book.findById(ticket.book._id);

        selectedBook.quantity += 1;
        await selectedBook.save();

        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.error || error});
    }
};