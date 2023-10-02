import mongoose from "mongoose";

const BorrowerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 5,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 50
        },
        name: {
            type: String
        }
    }, { timestamps: true }
);

const Borrower = mongoose.model("Borrower", BorrowerSchema);
export default Borrower;