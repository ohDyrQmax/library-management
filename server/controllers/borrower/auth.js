import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Borrower from "../../models/Borrower.js";

/* borrower authen */

//register
export const borrowerRegister = async (req, res) => {
    try {
        let {
            username,
            password,
            name
        } = req.body || req;

        let salt = await bcrypt.genSalt();
        let passwordHash = await bcrypt.hash(password, salt);

        let newBorrower = new Borrower({
            username,
            password: passwordHash,
            name
        });

        let savedUser = await newBorrower.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || error });
    }
}

//login
export const borrowerLogin = async (req, res) => {
    try {
        let { username, password } = req.body || req;
        let borrower = await Borrower.findOne({ username: username });
        if (!borrower) return res.status(400).json({ message: "Username not found." });

        let isMatchPassword = await bcrypt.compare(password, borrower.password);
        if (!isMatchPassword) return res.status(400).json({ message: "Wrong password." });

        let token = jwt.sign({ id: borrower.id }, process.env.JWT_SECRET);
        delete borrower.password;
        res.status(200).json({ borrower, token });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || error });
    }
}

