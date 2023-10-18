import Book from "../models/Book.js";
import BorrowTicket from "../models/BorrowTicket.js";
import moment from "moment";
import keyBy from "lodash/keyBy.js";
import User from "../models/User.js";

const defaultPageIndex = 0;
const ticketsPerPage = 10;
const defaultLimitDayCanBorrow = 4;
const datetimeFormat = "MMMM Do YYYY, h:mm:ss";

/* create */
export const createBorrowTicket = async (req, res) => {
    try {
        let { book, borrower, borrowedDate, expectReturnDate } = req.body;
        let selectedBook = await Book.findById(book._id);
        if (selectedBook.quantity < 1) return res.status(400).json({message: `${selectedBook.title} is currently unavailable.`});

        // borrowedDate = moment(new Date(borrowedDate)).format(datetimeFormat);
        // expectReturnDate = moment(new Date(expectReturnDate)).format(datetimeFormat);
        console.log(borrowedDate, expectReturnDate)
        let newBorrowTicket = new BorrowTicket({
            book,
            borrower,
            borrowedDate: borrowedDate,
            expectReturnDate: expectReturnDate,
        });
        await newBorrowTicket.save();

        selectedBook.quantity -= 1;
        selectedBook.save();

        return res.status(200).json(newBorrowTicket);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message || error});
    }
}

/* read */
export const getTicketList = async (req, res) => {
    try {
        let { guess } = req.query || req.params;
        let tickets = await BorrowTicket.find().populate("borrower").populate("book");
        // let array = await tickets.map(async (ticket) => {
        //     let user = await User.findById(ticket.borrowerId);
        //     let book = await Book.findById(ticket.bookId);
        //     return {
        //         _id: ticket._id,
        //         book: book.title,
        //         borrower: user.name,
        //         borrowedDate: ticket.borrowedDate,
        //         expectedReturnDate: ticket.expectedReturnDate
        //     }
        // })

        res.status(200).json(keyBy(tickets, '_id'));
    } catch (error) {
        res.status(error.status || 500).json({error: error.message || error});
    }
}

export const getTicketByUserId = async (req, res) => {
    try {
        let { id } = req.params || req.query;
        let tickets = await BorrowTicket.find({ borrowerId: id });
        return res.status(200).json(tickets);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message || error});
    }
}

/* update */
export const updateTicketReturnDateById = async (req, res) => {
    try {
        let { id } = req.params;
        let ticket = await BorrowTicket.findById(id);
        ticket.returnDate = moment().format(datetimeFormat);

        let selectedBook = await Book.findById(ticket.bookId);
        selectedBook.quantity += 1;
        await selectedBook.save();

        let updatedTicket = await ticket.save();
        res.status(200).json(updatedTicket);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message || error});
    }
};