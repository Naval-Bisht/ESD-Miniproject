// Header.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/header.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    // Clear login data from localStorage
    localStorage.setItem("isLogin", "false");
    navigate ('/')

  };

  return (
    <header className="header">
      <div className="header-title">IIITB Hostel Management</div>
      <div className="header-logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
