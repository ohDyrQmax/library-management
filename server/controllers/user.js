import bcrypt from "bcrypt";
import User from "../models/User.js";
import keyBy from "lodash/keyBy.js";
import Role from "../models/role.js";

/* create */
export const createUser = async (req, res) => {
    try {
        let {
            username,
            password,
            roleId,
            name
        } = req.body;

        let user = await User.findOne({ username: username });
        if (user) return res.status(409).json({ error: "Username taken" });

        let salt = await bcrypt.genSalt();
        let passwordHash = await bcrypt.hash(password, salt);

        let newUser = new User({
            username,
            password: passwordHash,
            roleId,
            name
        });

        let savedNewUser = await newUser.save();
        return res.status(201).json(savedNewUser);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message || error});
    }
};

/* read */
export const listUser = async (req, res) => {
    try {
        let { name } = req.query || req.body;
        let list = await User.find({
            name: { $regex: name || "" }
        });

        for (let user of list) {
            user.password = undefined;
        }

        res.status(200).json(keyBy(list, '_id'));
    } catch (error) {
        res.status(error.status || 500).json({error: error.message || error});
    }
};
export const getUserDetailById = async (req, res) => {
    try {
        let { id } = req.params || req.query || req;

        let user = await User.findById(id);

        delete user.password; //for some reason this doesn't work
        user.password = undefined;

        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({error: error.message || error});
    }
};

/* update */
export const updateUser = async (req, res) => {
    try {
        let {
            id,
            username,
            roleId,
            name
        } = req.body;

        let user = await User.findById(id);

        user.username = username;
        user.roleId = roleId;
        user.name = name;

        let updatedUser = await user.save();
        updateUser.password = undefined;
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message || error});
    }
};

/* delete */
export const deleteUserById = async (req, res) => {
  try {
      let { id } = req.params || req.query;
      let deletedUser = await User.findById(id);
      let deleteUserRole = await Role.findById(deletedUser.roleId);
      if (deleteUserRole.priority > 2) return res.status(400).send("Cannot delete manager account.");
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: `User ${deletedUser.username} deleted.` })
  }  catch (error) {
      return res.status(error.status || 500).json({error: error.message || error});
  }
};