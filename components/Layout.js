import React from 'react';
import { useTheme } from '../context/themeContext';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const { darkTheme } = useTheme();

  return (
    <div className={darkTheme ? 'vw-100 dark' : 'vw-100 light'}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
