import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../store/features/books/booksApi';

const Recommended = () => {
    const { data, isLoading, error } = useFetchAllBooksQuery();

    // Log the data structure to verify if it's an array or wrapped in an object
    console.log("Fetched books data:", data);

    // Check if data is an array or an object with books array inside it
    const books = Array.isArray(data) ? data : (data?.books || []);

    return (
        <div className='py-8'>
            <h2 className="text-3xl font-semibold mb-6 m-5">Recommended for you</h2>

            {isLoading && <p>Loading recommended books...</p>}
            {error && <p>Error loading recommended books. Please try again later.</p>}

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1080: { slidesPerView: 3, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {books.length > 0 ? (
                    books.slice(8, 18).map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                ) : (
                    !isLoading && <p>No recommended books available.</p>
                )}
            </Swiper>
        </div>
    );
};

export default Recommended;
