import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
        borrowedDate: String,
        expectReturnDate: String,
        returnDate: String,
    }, { timestamps: true }
);

BorrowTicketSchema.plugin(mongoosePaginate);

const BorrowTicket = mongoose.model("BorrowTicket", BorrowTicketSchema);
export default BorrowTicket;