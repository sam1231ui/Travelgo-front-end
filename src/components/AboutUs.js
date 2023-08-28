import React from 'react';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <div className="about-container">
      <header className="header">
        <h1 className="header-title">TravelGo</h1>
      </header>
      <section className="content" >
        <div className="about-content" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <h2>About Us</h2>
          <p>Your trusted partner in travel adventures! Whether you're seeking adventure, relaxation, TravelGo has the perfect journey for you.</p><br/>
        </div>
        <div className="contact-info" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:info@travelgo.com">info@travelgo.com</a></p>
          <p>Phone: +123-456-7890</p>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
