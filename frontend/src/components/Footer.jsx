import React from 'react';

const Footer = () => {
  const getFullYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-blue-950 text-white py-4 mt-auto">
      <div className="container mx-auto text-center text-sm">
        Copyright &copy; {getFullYear}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
