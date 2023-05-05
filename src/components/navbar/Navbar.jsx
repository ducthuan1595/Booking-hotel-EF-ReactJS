import "./navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/' className="logo">Booking Website</Link>
        <div className="navItems">
          <Link to='/form/register' >Register</Link>
          <Link to='/form/login' >Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
