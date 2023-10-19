import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const BorrowerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 5,
            max: 50,
            unique: true
        },
        roleId: {
            type:String,
            required: true
        },
        name: {
            type: String,
            required: true,
            min: 3,
            max: 50
        },
    }
);

const BorrowTicketSchema = new mongoose.Schema(
    {
        book: {type: mongoose.Schema.Types.ObjectId, ref: "Book", unique: false},
        // borrower: {type: mongoose.Schema.Types.ObjectId, ref: "User", unique: false},
        borrower: {type:BorrowerSchema, unique: false},
        borrowedDate: String,
        expectReturnDate: String,
        returnDate: String,
    }, { timestamps: true }
);

BorrowTicketSchema.plugin(mongoosePaginate);

const BorrowTicket = mongoose.model("BorrowTicket", BorrowTicketSchema);
export default BorrowTicket;