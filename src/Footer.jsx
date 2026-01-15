import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      <div className="footer_content">
        {/* About Section */}
        <div className="footer_section">
          <h3>About Us</h3>
          <p>
            Conference Expense Planner helps you organize and budget your
            perfect event with ease and precision.
          </p>
          <div className="social_links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="Instagram">📷</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer_section">
          <h3>Quick Links</h3>
          <div className="quick_links">
            <a href="#venue">Venue Selection</a>
            <a href="#addons">Add-ons</a>
            <a href="#meals">Meals</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer_section">
          <h3>Contact</h3>
          <div className="contact_info">
            <div className="contact_item">info@conferenceplan.com</div>
            <div className="contact_item">+1 (555) 123-4567</div>
            <div className="contact_item">123 Business Ave, NY 10001</div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer_section">
          <h3>Newsletter</h3>
          <p>Subscribe for updates and special offers!</p>
          <form className="newsletter_form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="newsletter_input"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter_btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer_bottom">
        <p>
          © 2026 Conference Planner. All rights reserved for{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            JJ's
          </a>
          . Designed with ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;