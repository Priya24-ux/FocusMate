


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import AppNavbar from './Navbar';
import Footer from './Footer';

const HomePage = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  // Apply dark mode based on state
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  }, [darkMode]);

  return (
    <div className="main-content">
      {/* Navbar */}
      {/* <AppNavbar darkMode={darkMode} setDarkMode={setDarkMode} /> */}

      {/* Hero Section */}
      <Container className="text-center mt-5">
        <h1 className="display-4 fw-bold">
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'} - Stay Organized!
        </h1>
        <p className="lead">Manage your daily tasks with ease using our simple and effective To-Do App.</p>
        
        <div className="mt-4">
          <Button variant="primary" size="lg" className="mx-2" onClick={() => navigate('/login')}>
            Get Started
          </Button>
          <Button variant="outline-success" size="lg" className="mx-2" onClick={() => navigate('/register')}>
            Sign Up
          </Button>
        </div>
      </Container>

      {/* Footer */}
      {/* <Footer darkMode={darkMode} /> */}
    </div>
  );
};

export default HomePage;

