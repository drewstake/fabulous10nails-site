import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import CareersPage from './pages/CareersPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="center-nav">
            <ul className="nav-links">
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/services" className="nav-link">Services</Link>
              </li>
              <li>
                <Link to="/careers" className="nav-link">Careers</Link>
              </li>
            </ul>
          </div>
          <div className="book-container">
            <a 
              href="https://book.squareup.com/appointments/yvzkpxjnwzqnnb/location/LRZJ8PYM8GKQH/services" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link book-button"
            >
              Book
            </a>
          </div>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
