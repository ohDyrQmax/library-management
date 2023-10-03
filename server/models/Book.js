import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        authorId: {
            type: String,
            required: true
        },
        categoryId: {
            type: String,
            required: true
        },
        shelf: {
            type: String,
            // required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }, { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);
export default Book;