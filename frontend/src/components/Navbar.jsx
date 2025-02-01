import React, { useState, useEffect } from 'react';
import { IoBedOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import { useAuthStore } from "../store/authStore";

function Navbar({ role }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  });
  const { logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser !== user) {
        setUser(storedUser);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    logout();
    setUser(null);
    setMenuOpen(false);
    navigate('/home');
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    navigate('/profile');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className='mb-16'>
      <div className={`h-16 flex justify-between items-center z-50 fixed top-0 left-0 w-full px-5 md:px-10 ${role === 'admin' ? 'bg-gray-800' : 'bg-teal-600'}`}>
        <IoBedOutline size={50} color='white' className='ml-5' />
        <div className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={25} color='white' className='hover:cursor-pointer' /> : <FaBars size={25} color='white' className='hover:cursor-pointer' />}
        </div>
        <ul className={`flex-col font-serif md:flex-row md:flex gap-10 absolute md:static ${role === 'admin' ? 'bg-gray-800' : 'bg-teal-600'} w-full md:w-auto transition-all duration-300 ease-in ${menuOpen ? 'top-16' : 'top-[-490px]'}`}>
          <li
            className={`text-white hover:cursor-pointer hover:text-yellow-300 font-bold text-lg md:py-0 py-2 text-center ${isActive('/home') ? 'bg-yellow-300 p-2 rounded-md' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {role !== "admin" && <Link to="/home">Home</Link>}
          </li>
          <li
            className={`text-white hover:cursor-pointer hover:text-yellow-300 font-bold text-lg md:py-0 py-2 text-center ${isActive('/about') ? 'bg-yellow-300 p-2 rounded-md' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {role !== "admin" && <Link to="/about">About</Link>}
          </li>
          <li
            className={`text-white hover:cursor-pointer hover:text-yellow-300 font-bold text-lg md:py-0 py-2 text-center ${isActive('/contact') ? 'bg-yellow-300 p-2 rounded-md' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {role !== 'admin' ? (<Link to="/contact">Contact</Link>) : (<Link to="/admin">Dashboard</Link>)}
          </li>
          {user ? (
            <div className="relative md:py-0 py-2 text-center group">
              <div className="text-white text-xl flex items-center gap-1 hover:cursor-pointer justify-center">
                <IoPersonCircleSharp size={30} className='hover:cursor-pointer' />
                {user.name}
                <FaCaretDown size={20} className='hover:cursor-pointer ml-1' />
              </div>
              <div className="absolute right-0 w-32 bg-blue-600 shadow-lg rounded-md py-2 z-10 hidden group-hover:block">
                <div onClick={handleProfileClick} className="block px-4 py-2 text-white hover:bg-yellow-300 cursor-pointer">
                  Profile
                </div>
                <button onClick={handleLogout} className="block py-2 text-white hover:bg-yellow-300 w-full text-center">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center sm:flex">
              <Link
                to="/login"
                className={`text-white hover:cursor-pointer hover:text-yellow-300 font-bold text-lg md:py-0 py-2 text-center ${isActive('/login') ? 'bg-yellow-300 p-2 rounded-md' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className={`text-white hover:cursor-pointer hover:text-yellow-300 font-bold text-lg md:py-0 py-2 text-center md:ml-10 ${isActive('/SignUp') ? 'bg-yellow-300 p-2 rounded-md' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                SignUp
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
