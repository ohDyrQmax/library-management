import Book from "../models/Book.js";
import Author from "../models/Author.js";
import Category from "../models/Category.js";
import  keyBy  from "lodash/keyBy.js";


/* utility */
const addNewAuthor = async (name) => {
    let existed = await Author.findOne({ name: name });
    if (existed) return existed;
    let newAuthor = new Author({ name: name });
    return await newAuthor.save();
};

const addNewCategory = async (name) => {
    let existed = await Category.findOne({ name: name });
    if (existed) return existed;
    let newCategory = new Category({ name: name });
    return await newCategory.save();
};

/* create */
export const createBook = async (req, res) => {
    try {
        let {
            title,
            authorId,
            categoryId,
            shelf,
            quantity
        } = req.body;

        let existed = await Book.exists({
            title,
            authorId,
        });

        if (existed) {
            let existBook = await Book.findOne({
                title,
                authorId,
            })
            existBook.quantity = existBook.quantity + quantity;
            await existBook.save();
            return res.status(200).json({ message: `Update quantity for ${title}` });
        }

        let newBook = new Book({
            title,
            authorId,
            categoryId,
            shelf,
            quantity
        });

        let addedBook = await newBook.save();
        return res.status(200).json(addedBook);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || error });
    }
}

/* read */
export const listBook = async (req, res) => {
    try {
        let { title, author, category } = req.query || req.body;
        let list = await Book.find({
            title: { $regex: title || "", $options: 'i' },
            authorId: { $regex: author || "" },
            categoryId: { $regex: category || "" }
        });

        //.skip((item_per_page * current_page_no)-item_per_page)).limit(item_per_page)
        return res.status(200).json(keyBy(list, "_id"));
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || error });
    }
};

export const findBookById = async (req, res) => {
    try {
        let { id } = req.params || req.query || req.body;
        let book = await Book.findOne({ _id: id });

        if (!book) return res.status(400).json({ message: "Book not found" });

        return res.status(200).json(book);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || error });
    }
};

/* update */
export const updateBookById = async (req, res) => {
    try {
        let { id } = req.params || req.query;
        let { title, authorId, categoryId, shelf, quantity } = req.body;
        let book = await Book.findById(id);
        book.title = title || book.title;
        book.authorId = authorId || book.authorId;
        book.categoryId = categoryId || book.categoryId;
        book.shelf = shelf || book.shelf;
        book.quantity = quantity || book.quantity;

        let updatedBook = await book.save();
        res.status(200).json(updatedBook)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || error });
    }
};

/* delete */
export const deleteBookById = async (req, res) => {
  try {
      let { id } = req.params || req.body;
      await Book.findByIdAndDelete(id);
      return res.status(204);
  } catch (error) {
      res.status(error.status || 500).json({ error: error.message || error });
  }
};