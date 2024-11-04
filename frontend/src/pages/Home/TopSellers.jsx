import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../store/features/books/booksApi';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
    const { data, isLoading, error } = useFetchAllBooksQuery();

    // Log the data structure to verify if it's an array or wrapped in an object
    console.log("Fetched books data:", data);

    // Check if data is an array or an object with books array inside it
    const books = Array.isArray(data) ? data : (data?.books || []); 

    const filteredBooks = selectedCategory === "Choose a genre"
        ? books
        : books.filter(book => book.category?.toLowerCase() === selectedCategory.toLowerCase());

    if (isLoading) return <p>Loading books...</p>;
    if (error) return <p>Error loading books. Please try again later.</p>;

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            {/* Category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id="category"
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1180: { slidesPerView: 3, spaceBetween: 50 }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                ) : (
                    <p>No books available in this category.</p>
                )}
            </Swiper>
        </div>
    );
};

export default TopSellers;
