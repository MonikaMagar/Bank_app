import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
       
       <hr class="styled-line" />

      <section id="about" className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <p>
            Welcome to Your Bank! We are a trusted financial institution committed to offering reliable and secure banking services.
            With over two decades of experience, we have developed a strong reputation for customer satisfaction and innovation.
          </p>
          <p>
            Whether you need personal banking, investment advice, or corporate finance services, we are here to help you achieve your financial goals.
            Our dedicated team of experts ensures that we provide personalized, high-quality service tailored to your needs.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Your Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
