import React from "react";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-12 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-end m-5">
        <img src={bannerImg} alt="Banner Image" />
      </div>
      <div className="md:w-1/2 w-full m-5">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          New Releases This Week
        </h1>
        <p className="mb-10 ">
          It's time to update your reading list with some of the latest and
          greatest releases in the world. From compelling page-turners that keep
          you up all night to thought-provoking narratives that challenge your
          perspective, this season's literary offerings have something for every
          reader. Whether you're into gripping mysteries, heartwarming
          contemporary fiction, or mind-expanding non-fiction, there's never
          been a better time to dive into a new book.
        </p>
        <button className="btn-primary">Subscribe</button>
      </div>
    </div>
  );
};

export default Banner;
