import Book from "../models/Book.js";
import BorrowTicket from "../models/BorrowTicket.js";
import moment from "moment";

const defaultPageIndex = 0;
const ticketsPerPage = 10;
const defaultLimitDayCanBorrow = 4;
const datetimeFormat = "MMMM Do YYYY, h:mm:ss";

/* create */
export const createBorrowTicket = async (req, res) => {
    try {
        let { bookId, borrowerId, borrowedDate } = req.body;
        let selectedBook = await Book.findById(bookId);
        if (selectedBook.quantity < 1) return res.status(400).json({message: `${selectedBook.title} is currently unavailable.`});

        borrowedDate = moment(new Date(borrowedDate)).format(datetimeFormat);
        let expectReturnDate = moment().add(defaultLimitDayCanBorrow, 'd').format(datetimeFormat);

        let newBorrowTicket = new BorrowTicket({
            bookId,
            borrowerId,
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
        let tickets = await BorrowTicket.find({
            borrowerId: { $regex: guess || "" }
        });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(error.status || 500).json({error: error.message || error});
    }
}

export const getTicketById = async (req, res) => {
    try {
        let { id } = req.params || req.query;
        let ticket = await BorrowTicket.find({ _id: id });
        if (!ticket) return res.status(400).json({ error: "Ticket not found" });
        return res.status(200).json(ticket);
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