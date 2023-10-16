import Role from "../models/role.js";
import keyBy from "lodash/keyBy.js";

/* read */
export const listRole = async (req, res) => {
    try {
        let list = await Role.find();
        res.status(200).json(keyBy(list, '_id'));
    } catch (error) {
        res.status(error.status || 500).json({error: error.message || error});
    }
};
