import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-start px-6">
        
        {/* Quick Links Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-teal-600 font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-teal-600 hover:underline">About Us</Link>
            </li>
            <li>
              <Link to="/directory" className="text-teal-600 hover:underline">Directory</Link>
            </li>
            <li>
              <Link to="/news" className="text-teal-600 hover:underline">News</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-teal-600 font-semibold text-lg mb-3">Follow Me</h3>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/sebastian-villegas-jimenez/" className="text-teal-600 hover:opacity-75 transition">
              {/* <img src="linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" /> */}
            </a>
          </div>
        </div>

        {/* Legal Links Section */}
        <div>
          <h3 className="text-teal-600 font-semibold text-lg mb-3">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy-policy" className="text-teal-600 hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="text-teal-600 hover:underline">Terms of Service</Link>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;