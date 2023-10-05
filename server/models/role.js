import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        priority: {
            type: Number,
            required: true
        }
    }, { timestamps: true }
);

const Role = mongoose.model("Role", RoleSchema);
export default Role;    