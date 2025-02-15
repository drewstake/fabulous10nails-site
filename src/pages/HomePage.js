import React from 'react';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <header className="hero">
        <div className="hero-overlay">
          <h1>Fabulous 10 Nails</h1>
          <p>Your beauty, our passion</p>
        </div>
      </header>
      <section className="intro">
        <h2>Welcome to Fabulous 10 Nails</h2>
        <p>
          Experience luxury nail care services in a tranquil environment. Our expert team provides high-quality treatments that leave you feeling pampered and looking your best.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
