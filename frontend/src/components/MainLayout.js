import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container my-4">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
