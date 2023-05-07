import "./navbar.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const user = useSelector(state => state.auth.informUser);
  // console.log('sign-out', user);

  const handleLogout = () => {
    if(isLogin) {
      dispatch(signOut());
    }
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/' className="logo">Booking Website</Link>
        <div className="navItems">
          {/* <button onClick={handleLogout}>signOut</button> */}
          {isLogin && <div>{user.user.email}</div>}
          <Link to={isLogin ? '' : '/form/register'} >{isLogin ? 'Transaction' : 'Register'}</Link>
          <Link to='/form/login' onClick={handleLogout}>{isLogin ? 'Logout' : 'Login'}</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
