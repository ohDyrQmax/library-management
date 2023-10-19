import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/role.js";

const tokenSessionExpireIn = "30m";
const thirtyMinuteInSec = 30 * 60;

//login
export const userLogin = async (req, res) => {
    try {
        let { username, password } = req.body || req;

        let user = await User.findOne({ username: username });
        if (!user) return res.status(400).json({ message: "Username not found." });

        let role = await Role.findOne({ _id: user.roleId });

        let isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) return res.status(400).json({ error: "Invalid credentials." });

        user.password = undefined;

        let token = jwt.sign(
            { user: user, role: role },
            process.env.JWT_SECRET,
            { expiresIn: tokenSessionExpireIn }
        );

        res.status(200).json({ user, priority: role.priority, token, expiredAt: thirtyMinuteInSec });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.error || error });
    }
}

