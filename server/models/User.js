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
    }, { timestamps: true }
);

const User = mongoose.model("User", BorrowerSchema);
export default User;