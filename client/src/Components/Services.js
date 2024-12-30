// Services.js
import React from "react";
import "./Services.css"; // Import the Services-specific CSS file

const Services = () => {
  return (
    <div className="services-page">
     <hr class="styled-line" />


      <main className="services-banner">
        <h1>Our Services</h1>
        <p>
          At M.A.M Finance, we offer a variety of financial services to help you grow and manage your wealth.
        </p>
        <div className="services-list">
          <div className="service">
            <h3>Investment Planning</h3>
            <p>Expert strategies to help you invest wisely.</p>
          </div>
          <div className="service">
            <h3>Loan Assistance</h3>
            <p>Get financial support with tailored loan options.</p>
          </div>
          <div className="service">
            <h3>Retirement Planning</h3>
            <p>Secure your future with our retirement strategies.</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 M.A.M Finance. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;
