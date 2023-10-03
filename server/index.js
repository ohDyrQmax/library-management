import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import borrowerRoutes from "./routes/borrower.js";
import employeeRoutes from "./routes/employee.js";
import borrowTicketRoutes from "./routes/borrowTicket.js";
import bookRoutes from "./routes/book.js";

import Category from "./models/Category.js";
import Author from "./models/Author.js";
import Book from "./models/Book.js";
import { authors, categories, books } from "./data/index.js";

/* configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// app.use(morgan());
app.use(express.json);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb" })); // , extended: true
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//stores assets files locally, for simplicity sakes.
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* file storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* routes */
app.use("/borrower", borrowerRoutes);
app.use("/employee", employeeRoutes);
app.use("/ticket", borrowTicketRoutes);
app.use("/book", bookRoutes);

/* mongoose setup */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    /* Add data once */
    // Author.insertMany(authors);
    // Category.insertMany(categories);
    // Book.insertMany(books);
  })
  .catch((error) => console.log(`Cannot establish connection: ${error}`));
