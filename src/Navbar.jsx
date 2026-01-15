import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ navigateToProducts }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section) => {
    navigateToProducts(section);
    setIsMenuOpen(false); // Close menu after navigation on mobile
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar_event_conference">
      <div className="company_logo">Conference Planner</div>
      
      <button 
        className={`mobile_menu_btn ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav_links ${isMenuOpen ? 'active' : ''}`}>
        <a onClick={() => handleNavClick("#venue")}>Venue</a>
        <a onClick={() => handleNavClick("#addons")}>Add-ons</a>
        <a onClick={() => handleNavClick("#meals")}>Meals</a>
      </div>
    </nav>
  );
};

export default Navbar;