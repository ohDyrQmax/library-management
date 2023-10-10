import Category from "../models/Category.js";
import keyBy from "lodash/keyBy.js";
/* read */
export const listCategory = async (req, res) => {
  try {
    let list = await Category.find().sort({ name: 1 });
    return res.status(200).json(keyBy(list, '_id'));
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message || error });
  }
};

export const findCategoryById = async (req, res) => {
    try {
        let { id } = req.params || req.query || req.body;
        let category = await Category.findById(id);

        if(!category) return res.status(400).json({ message: "Category not found" });

        return res.status(200).json(category);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || error });
    }
};
