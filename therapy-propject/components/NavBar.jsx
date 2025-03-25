import { Link } from "react-router-dom";

//change the look of this later down the road
function NavBar() {
  return (
    <nav className="bg-teal-600 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Company Name */}
        <h1 className="text-white text-xl font-semibold">Company Name</h1>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/directory" className="hover:underline">Directory</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/news" className="hover:underline">News</Link>
        </div>

        {/* Buttons Container */}
        {/* space-x-4 helps you control the horizontal space between sibling elements by either increasing it or reducing it. The higher the number the more space and vice versa Elements that are inside the same parent container */}
        <div className="flex space-x-5"> 
          {/* Login Button */}
          <button className="bg-white text-teal-600 font-medium px-4 py-2 rounded-md hover:bg-gray-200">
            Login
          </button>

          {/* Join Us Button */}
          <Link 
            to="/joinus" 
            className="bg-[#d9e4dd] text-teal-600 font-medium px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white transition-colors duration-300"
          >
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;