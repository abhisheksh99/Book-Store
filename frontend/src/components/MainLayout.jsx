import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from "./Footer"

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
