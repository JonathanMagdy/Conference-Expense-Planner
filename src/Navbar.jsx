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

  // Logo behaves exactly like "Get Started" buttons
  const scrollToTopLikeGetStarted = () => {
    // Use the same smooth scroll logic
    navigateToProducts(".main_container");
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar_event_conference">
      {/* Logo clickable */}
      <div
        className="company_logo"
        onClick={scrollToTopLikeGetStarted}
        style={{ cursor: "pointer" }}
      >
        Conference Planner
      </div>
      
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
