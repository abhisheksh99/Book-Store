import express from "express";
import { deleteBook, getAllBooks, getSingleBook, postABook, updateBook } from "../controllers/bookController.js";
import verifyAdminToken from "../middleware/verifyAdmin.js";

const router = express.Router();

// Route to create a new book
// POST /create-book - Calls the postABook controller to add a new book to the database
router.route("/create-book").post(verifyAdminToken,postABook);

// Route to retrieve all books
// GET / - Calls the getAllBooks controller to retrieve a list of all books
router.route("/").get(getAllBooks);

// Route to retrieve a single book by its ID
// GET /:id - Calls the getSingleBook controller to retrieve a specific book based on its ID
router.route("/:id").get(getSingleBook);

// Route to update a book by its ID
// PUT /edit/:id - Calls the updateBook controller to update an existing book with new data based on its ID
router.route("/edit/:id").put(updateBook);

// Route to delete a book by its ID
// DELETE /:id - Calls the deleteBook controller to remove a specific book from the database by its ID
router.route("/:id").delete(deleteBook);

export default router;
