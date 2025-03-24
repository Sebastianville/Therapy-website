import { Link } from "react-router-dom";
import './Footer.css'; // You can create a CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/about" className="footer-link">About Us</Link>
            </li>
            <li>
              <Link to="/directory" className="footer-link">Directory</Link>
            </li>
            <li>
              <Link to="/news" className="footer-link">News</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3>Follow me</h3>
          <div className="social-icons">
            {/* Replace # with actual social media URLs */}
            <a href="https://www.linkedin.com/in/sebastian-villegas-jimenez/" className="social-icon">
              <img src="linkedin-icon.png" alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Legal Links Section */}
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
