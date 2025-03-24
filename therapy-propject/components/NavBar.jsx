import { Link } from "react-router-dom";

//change the look of this later down the road
function NavBar() {
    return (
      <div className="nav" style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
        {/* Navigation Links */}
        <Link to="/" style={{ margin: "10px", color: "white", textDecoration: "none" }}>HomePage</Link>
        <Link to="/directory" style={{ margin: "10px", color: "white", textDecoration: "none" }}>Directory</Link>
        <Link to="/about" style={{ margin: "10px", color: "white", textDecoration: "none" }}>About Us</Link>
        <Link to="/news" style={{ margin: "10px", color: "white", textDecoration: "none" }}>NewsPage</Link>
  
      </div>
    );
}

export default NavBar