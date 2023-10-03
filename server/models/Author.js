import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    }, { timestamps: true }
);

const Author = mongoose.model("Author", AuthorSchema);
export default Author;