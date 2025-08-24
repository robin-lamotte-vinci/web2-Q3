import "./NavBar.css"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/cinemas")}>Cinemas</button>
      <button onClick={() => navigate("/movie-list")}>Movies</button>
    </nav>
  );
};

export default NavBar;