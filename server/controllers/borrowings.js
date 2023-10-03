import Borrower from "../models/Borrower.js";
import Book from "../models/Book.js";
import BorrowTicket from "../models/BorrowTicket.js";

export const makeBorrowTicket = async (res, req) => {
    try {
        let { bookId, borrowerId } = res.body || res;
        let book = await Book.findById(bookId);
        let borrower = await Borrower.findById(borrowerId);

        let borrowedDate = new Date();
        let fourDaysInMillis = 1000*60*60*24*4;
        let expectedReturnDate = new Date(borrowedDate.getTime() + fourDaysInMillis);

        let newBorrowTicket = new BorrowTicket({
           bookId,
           borrowerId,
           borrowedDate: borrowedDate,
            expectReturnDate: expectedReturnDate,
        });

        res.status(200).json({
            id: newBorrowTicket.__id,
            borrowerName: borrower.name,

        })

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || error });
    }
}