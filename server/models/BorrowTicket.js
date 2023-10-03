import mongoose from "mongoose";

const BorrowTicketSchema = new mongoose.Schema(
    {
        bookId: {
            type: String,
            required: true
        },
        borrowerId: {
            type: String,
            required: true
        },
        borrowedDate: Date,
        expectReturnDate: Date,
        returnDate: Date,
    }, { timestamps: true }
);

const BorrowTicket = mongoose.model("BorrowTicket", BorrowTicketSchema);
export default BorrowTicket;