import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '../redux/api';
import { logoutUser } from '../redux/slices/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUserApi, { isLoading }] = useLogoutUserMutation();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const handleLogout = async () => {
    try {
      const res = await logoutUserApi().unwrap();
      console.log('Logout response:', res); 
      if (res.success) { 
        dispatch(logoutUser()); 
        navigate('/login'); 
      } else {
        console.error('Logout unsuccessful:', res.message);
      }
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="#">Item 1</Link></li>
            <li>
              <Link to="#">Parent</Link>
              <ul className="p-2">
                <li><Link to="#">Submenu 1</Link></li>
                <li><Link to="#">Submenu 2</Link></li>
              </ul>
            </li>
            <li><Link to="#">Item 3</Link></li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">daisyUI</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="#">Item 1</Link></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><Link to="#">Submenu 1</Link></li>
                <li><Link to="#">Submenu 2</Link></li>
              </ul>
            </details>
          </li>
          <li><Link to="#">Item 3</Link></li>
        </ul>
      </div>
      {isLoggedIn ? (
        <div className="navbar-end">
          <Link className="btn" to="/profile">Profile</Link>
          <button onClick={handleLogout} className="btn" disabled={isLoading}>
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      ) : (
        <div className="navbar-end">
          <Link className="btn" to="/sign-up">Signup</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
