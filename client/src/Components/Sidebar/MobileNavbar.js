import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PiArrowFatLineDownBold, PiArrowFatLineUpBold } from 'react-icons/pi';
import { TbBrandGoogleHome } from 'react-icons/tb';
import { MdTimeline } from 'react-icons/md';
import './MobileNavbar.css';

const MobileNavbar = () => {
  const location = useLocation();
  const active = location.pathname;

  return (
    <div className="mobile-navbar">
      <Link
        className={`mobile-navbar-link ${active === '/user/dashboard' ? 'active' : ''}`}
        to={'/user/dashboard'}
      >
        <TbBrandGoogleHome className="navbar-icon" />
      </Link>
      <Link
        className={`mobile-navbar-link ${active === '/user/deposit' ? 'active' : ''}`}
        to={'/user/deposit'}
      >
        <PiArrowFatLineDownBold className="navbar-icon" />
      </Link>
      <Link
        className={`mobile-navbar-link ${active === '/user/send' ? 'active' : ''}`}
        to={'/user/send'}
      >
        <PiArrowFatLineUpBold className="navbar-icon" />
      </Link>
      <Link
        className={`mobile-navbar-link ${active === '/user/history' ? 'active' : ''}`}
        to={'/user/history'}
      >
        <MdTimeline className="navbar-icon" />
      </Link>
    </div>
  );
};

export default MobileNavbar;
