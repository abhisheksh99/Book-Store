import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";

// Controller to post a new book
export const postABook = asyncHandler(async (req, res) => {
  const { title, description, category, coverImage, oldPrice, newPrice } = req.body;

  if (!title || !description || !category || !coverImage || oldPrice == null || newPrice == null) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  const newBook = new Book({ ...req.body });
  await newBook.save();
  res.status(201).json({ message: "Book posted successfully", book: newBook });
});

// Controller to get all books
export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });
  
  if (books.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.status(200).json({ message: "Books retrieved successfully", books });
});

// Controller to get a single book by ID
export const getSingleBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json({ message: "Book retrieved successfully", book });
});

// Controller to update a book by ID
export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
    new: true, 
    runValidators: true,
  });

  res.status(200).json({ message: "Book updated successfully", book: updatedBook });
});

// Controller to delete a book by ID
export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  await Book.findByIdAndDelete(id);
  res.status(200).json({ message: "Book deleted successfully" });
});
