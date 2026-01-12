import React from "react";
import "./Navbar.css";

const Navbar = ({ navigateToProducts }) => {
  return (
    <nav className="navbar_event_conference">
      <div className="company_logo">Conference Expense Planner</div>
      <div className="nav_links">
        <a onClick={() => navigateToProducts("#venue")}>Venue</a>
        <a onClick={() => navigateToProducts("#addons")}>Add-ons</a>
        <a onClick={() => navigateToProducts("#meals")}>Meals</a>
      </div>
    </nav>
  );
};

export default Navbar;
