import React from "react";
import { Routes, Route } from "react-router-dom"; // No need to import BrowserRouter
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery
import "./App.css";
import Services from "./Components/Services"; // Import the Services component
import About from "./Components/About"; // Import the About component
import HomePage from "./Components/HomePage";
import Register from "./Components/Register";
import VerifyOTP from "./Components/VerifyOTP";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import History from "./Components/History/TransactionHistory";
import DetailTransation from "./Components/History/DetailTransation";
import Profile from "./Components/Profile/Profile";
import DepositMoney from "./Components/Deposit/DepositMoney";
import SendMoney from "./Components/SendMoney/SendMoney";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import MobileNavbar from "./Components/Sidebar/MobileNavbar"; // Import the MobileNavbar component
import ContactPage from "./Components/ContactPage";

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Check if the screen size is mobile

  return (
    <div className="homepage">
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Route */}
        <Route path="/services" element={<Services />} /> {/* Services Route */}
        <Route path="/about" element={<About />} /> {/* About Route */}
        <Route path ="/contact" element={<ContactPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected User Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/user/dashboard" element={<Dashboard />} /> {/* Dashboard Route */}
          <Route path="/user/history" element={<History />} />
          <Route path="history/:transactionId" element={<DetailTransation />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="user/deposit" element={<DepositMoney />} />
          <Route path="user/send" element={<SendMoney />} />
        </Route>
      </Routes>
      {isMobile && <MobileNavbar />} {/* Render MobileNavbar only on mobile screens */}
    </div>
  );
};

export default App;
