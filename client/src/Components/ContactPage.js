import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  // State to handle form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by: ${formData.name}`);
    // Logic to handle form submission
    // You can send the form data to an API or process it here
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
     
     <hr class="styled-line" />

      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <p>We would love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 M.A.M Finance. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
