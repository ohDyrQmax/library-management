import jwt from "jsonwebtoken";
import Role from "../models/role.js";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) return res.status(403).send("Access denied[1]");

        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        let verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(error?.status || 500).json({ error: error.message || error });
    }
};

export const verifyAuthorizationStaff = async (req, res, next) => {
    try {
        let roleId = req.header("Role");
        if (!roleId) return res.status(403).send("Access denied[2]");

        let role = await Role.findOne({ _id: roleId });
        if (!role) return res.status(error?.status || 500).json({ error: "Access denied. Log from middleware." });

        if (role.priority > 1) next();
        else return res.status(403).send("Access denied[3]");
    } catch (error) {
        return res.status(error?.status || 500).json({ error: error.message || error });
    }
};

export const verifyAuthorizationManager = async (req, res, next) => {
    try {
        let roleId = req.header("Role");
        if (!roleId) return res.status(403).send("Access denied.");

        let role = await Role.findOne({ _id: roleId });
        if (!role) return res.status(error?.status || 500).json({ error: "Access denied. Log from middleware." });

        if (role.priority > 2) next();
        else return res.status(403).send("Access denied.");
    } catch (error) {
        return res.status(error?.status || 500).json({ error: error.message || error });
    }
};