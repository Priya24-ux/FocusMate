


import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const AppNavbar = ({ darkMode, setDarkMode }) => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // ✅ Update auth state when token changes
  useEffect(() => {
    const handleStorageChange = () => setAuth(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setAuth(null);
    navigate("/login"); // Redirect to login
    window.dispatchEvent(new Event("storage")); // ✅ Force Navbar to update
  };

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg">
      <Navbar.Brand as={Link} to="/">To-Do App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {auth && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}

          {auth ? (
            <Button variant="danger" className="ms-3" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
            </>
          )}

          {/* Dark Mode Toggle Button */}
          <Button
            variant={darkMode ? "light" : "dark"}
            className="ms-3"
            onClick={() => setDarkMode(prevMode => !prevMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;

