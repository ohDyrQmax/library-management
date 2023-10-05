import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/role.js";

//login
export const userLogin = async (req, res) => {
    try {
        let { username, password } = req.body || req;

        let user = await User.findOne({ username: username });
        if (!user) return res.status(400).json({ message: "Username not found." });

        let role = await Role.findOne({ _id: user.roleId });

        let isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) return res.status(400).json({ message: "Invalid credentials." });

        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        user.priority = role.priority;
        delete user.password;
        user.password = undefined; //for some reason this doesn't work

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || error });
    }
}

