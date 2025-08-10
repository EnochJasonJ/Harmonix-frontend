import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const resetPassword = async () => {
    const token = localStorage.getItem("access");
    const email = prompt("Enter your email address:");
    if (!email) return;

    try {
      const response = await axios.post(
        "https://harmonix-backend.onrender.com/password-reset-request/",
        { email },
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
      );
      alert(response.data.message || "If the email exists, a reset link has been sent.");
    } catch (error) {
      console.error("Password reset error:", error);
      alert(
        error.response?.data?.error ||
        "Something went wrong. Please try again later."
      );
    }
  };
  const handleLogout = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          setIsLoggedIn(false);
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 2000);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: 'Logging out...',
        success: <b>Logout successful!</b>,
        error: <b>Logout failed. Please try again.</b>,
      }
    );
  };

  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <nav className="fixed bg-gradient-to-r from-indigo-700 to-purple-700 p-2 z-20 shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center px-2 md:px-0">
        <Link to="/" className="text-white text-2xl font-extrabold tracking-wide drop-shadow-lg">Harmonix</Link>
        <button className="md:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className={`flex-col md:flex md:flex-row gap-2 md:gap-4 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-indigo-800 md:bg-transparent z-50 transition-all duration-300 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
          {token ? (
            <>
              <Link to="/" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium w-full md:w-auto text-center">Home</Link>
              <Link to="/member" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium w-full md:w-auto text-center">Profile</Link>
              <Link to="/attendance" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium w-full md:w-auto text-center">Attendance</Link>
              <Link to="/event" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium w-full md:w-auto text-center">Events</Link>
              <button
                onClick={resetPassword}
                className="px-3 py-2 rounded-md text-gray-100 hover:bg-pink-600 transition-colors duration-200 font-medium border-none bg-transparent cursor-pointer w-full md:w-auto text-center"
              >Reset Password</button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-gray-100 hover:bg-red-600 transition-colors duration-200 font-medium border-none bg-transparent cursor-pointer w-full md:w-auto text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium w-full md:w-auto text-center">Home</Link>
              <Link to="/login" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium w-full md:w-auto text-center">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
