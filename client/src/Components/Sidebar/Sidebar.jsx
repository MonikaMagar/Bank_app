import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { PiArrowFatLineDownBold, PiArrowFatLineUpBold } from 'react-icons/pi';
import { TbBrandGoogleHome } from 'react-icons/tb';
import { MdTimeline } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const location = useLocation();
  const active = location.pathname;

  const sidebarClass = `sidebar ${isMobile ? 'sidebar-mobile' : 'sidebar-desktop'}`;

  return (
    <div className={sidebarClass}>
      <h4 className="sidebar-title">Navigation</h4>
      <hr />
      <ul className="list-unstyled">
        <Link
          className={`sidebar-link ${active === '/user/dashboard' ? 'active' : ''}`}
          to={'/user/dashboard'}
        >
          <li className="d-flex align-items-center">
            <TbBrandGoogleHome className="me-2" />
            Home
          </li>
        </Link>
        <Link
          className={`sidebar-link ${active === '/user/deposit' ? 'active' : ''}`}
          to={'/user/deposit'}
        >
          <li className="d-flex align-items-center">
            <PiArrowFatLineDownBold className="me-2" />
            Deposit Money
          </li>
        </Link>
        <Link
          className={`sidebar-link ${active === '/user/send' ? 'active' : ''}`}
          to={'/user/send'}
        >
          <li className="d-flex align-items-center">
            <PiArrowFatLineUpBold className="me-2" />
            Send Money
          </li>
        </Link>
        <Link
          className={`sidebar-link ${active === '/user/history' ? 'active' : ''}`}
          to={'/user/history'}
        >
          <li className="d-flex align-items-center">
            <MdTimeline className="me-2" />
            History
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
