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

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 p-2 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-extrabold tracking-wide drop-shadow-lg">Harmonix</Link>
        <div className="flex gap-4 items-center">
          {token ? (
            <div className="flex gap-2">
              <Link to="/" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium">Home</Link>
              <Link to="/member" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium">Profile</Link>
              <Link to="/attendance" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium">Attendance</Link>
              <Link to="/events" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium">Events</Link>
              <button
                onClick={resetPassword}
                className="px-3 py-2 rounded-md text-gray-100 hover:bg-pink-600 transition-colors duration-200 font-medium border-none bg-transparent cursor-pointer"
              >Reset Password</button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-gray-100 hover:bg-red-600 transition-colors duration-200 font-medium border-none bg-transparent cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/" className="px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-600 transition-colors duration-200 font-medium">Home</Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-gray-100 hover:bg-red-600 transition-colors duration-200 font-medium border-none bg-transparent cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
