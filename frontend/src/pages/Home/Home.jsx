import React from 'react';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommended from './Recommended';
import News from './News';

const Home = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Banner />
        <TopSellers/>
        <Recommended />
        <News/>
      
      </div>
    </div>
    </>

  );
};

export default Home;
