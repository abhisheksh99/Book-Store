import React from 'react';

const Footer = () => {
  const getFullYear = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center bg-blue-950 text-white py-4 mt-10">
      <p className="text-sm">
       Copyright &copy; {getFullYear}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
