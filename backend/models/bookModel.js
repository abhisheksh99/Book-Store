import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  trending: {
    type: Boolean,
    default: false, 
  },
  coverImage: {
    type: String,
    required: [true, "Cover image URL is required"],
  },
  oldPrice: {
    type: Number,
    required: [true, "Old price is required"],
  },
  newPrice: {
    type: Number,
    required: [true, "New price is required"],
  },
}, {
  timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
