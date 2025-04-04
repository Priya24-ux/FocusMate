



import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className="text-center mt-5 py-3"
      style={{
        background: darkMode ? '#222' : '#f8f9fa',
        color: darkMode ? '#fff' : '#000',
        width: '100%',
        position: 'relative',
      }}
    >
      <p>© {new Date().getFullYear()} To-Do App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
