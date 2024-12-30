import React from "react";
import "./HomePage.css"; // Ensure you have a corresponding CSS file
import { Link } from 'react-router-dom'; // Ensure this is included
import AboutPage from "./About";
import Services from "./Services";
import ContactPage from "./ContactPage";

const Home = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">M.A.M BANK</div>
        <nav>
          <ul className="nav-linkss">
            <li><a href="/">Home</a></li> {/* Link to Home page */}
            <li><a href="#about">About</a></li> {/* Link to About page */}
            <li><a href="#services">Services</a></li> {/* Link to Services page */}
            <li><a href="#contact">Contact</a></li> {/* Link to Contact page */}
          </ul>
        </nav>
        <Link to="/register">
        <button className="signup" style={{backgroundColor:"orangered"}}>Sign Up</button>
      </Link>
      </header>

      {/* Main Banner Section */}
      <main className="main-banner">
        <div className="banner-content">
          <h1>M.A.M BANK WITH CERTAINTY SERVICES</h1>
          <p>
            Trust us to meet your financial needs. Our expertise will ensure
            your success.
          </p>
          <div className="action-buttons">
          <Link to="/register">
        <button className="signup">Sign Up</button>
      </Link>
      <Link to="/login">
      <button className="signin">Sign In</button>
      </Link>
           
          </div>
        </div>
      </main>
      <div className="home-page">
      <AboutPage/>
      <Services />
      <ContactPage />
    </div>
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 M.A.M BANK. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
