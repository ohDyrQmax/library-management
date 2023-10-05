import Author from "../models/Author.js";

/* read */
export const listAuthor = async (req, res) => {
    try {
        let list = await Author.find();
        return res.status(200).json(list);
    } catch (error) {
        return res(error.status || 500).json({ error: error.message || error });
    }
};

export const findAuthorById = async (req, res) => {
    try {
        let { id } = req.params || req.query || req.body;
        let author = await Author.findById(id);

        if (!author) return res.status(400).json({ message: "Author not found" });

        res.status(200).json(author);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || error });
    }
};
