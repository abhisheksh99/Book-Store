import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useFetchBookByIdQuery } from '../../store/features/books/booksApi';
import { getImgUrl } from '../../utils/getImagUrl';
import { addToCart } from '../../store/features/cart/cartSlice';

const SingleBook = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useFetchBookByIdQuery(id);

    // Extract the book data correctly
    const book = data?.book;

    // Log the book data to verify the structure
    console.log(book);

    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading book info.</div>;

    // Check if book data exists before rendering
    if (!book) return <div>Book not found.</div>;

    return (
        <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.title || "Title Unavailable"}</h1>

            <div>
                <img
                    src={book.coverImage ? getImgUrl(book.coverImage) : "/path/to/placeholder-image.jpg"}
                    alt={book.title || "Book cover"}
                    className="mb-8"
                />
            </div>

            <div className="mb-5">
                <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || "admin"}</p>
                <p className="text-gray-700 mb-4">
                    <strong>Published:</strong> {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "N/A"}
                </p>
                <p className="text-gray-700 mb-4 capitalize">
                    <strong>Category:</strong> {book.category || "Uncategorized"}
                </p>
                <p className="text-gray-700"><strong>Description:</strong> {book.description || "No description available"}</p>
            </div>

            <button
                onClick={() => handleAddToCart(book)}
                className="btn-primary px-6 flex items-center gap-1"
            >
                <FiShoppingCart />
                <span>Add to Cart</span>
            </button>
        </div>
    );
};

export default SingleBook;
