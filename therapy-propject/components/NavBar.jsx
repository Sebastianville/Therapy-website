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
          <Link to="/" className="hover:underline">HomePage</Link>
          <Link to="/directory" className="hover:underline">Directory</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/news" className="hover:underline">NewsPage</Link>
        </div>

        {/* Login Button */}
        <button className="bg-white text-teal-600 font-medium px-4 py-2 rounded-md hover:bg-gray-200">
          Login
        </button>
      </div>
    </nav>
  );
}

export default NavBar