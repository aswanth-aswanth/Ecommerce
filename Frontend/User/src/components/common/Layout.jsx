
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BreadCrump from './BreadCrump';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {/* <BreadCrump/> */}
      <div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
