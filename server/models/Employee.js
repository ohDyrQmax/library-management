import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
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
        // role: {
            
        // }
    }, { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;