import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const forgotPassword = async () => {
    const token = localStorage.getItem("access");
    const email = prompt("Enter your email address:");
    if (!email) return;

    try {
      const response = await axios.post(
        "https://harmonix-backend.onrender.com/password-reset-request/",
        { email },
        { headers: { "Content-Type": "application/json" , "Authorization" : `Bearer ${token}`} }
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
    try {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      console.log("Logout successful");
      console.log("Access Token after logout:", localStorage.getItem('access'));

      setIsLoggedIn(false); // 👈 Tell App to update auth state
      navigate('/login', { replace: true }); // replace prevents back navigation
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Harmonix</Link>
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/attendance" className="text-gray-300 hover:text-white">Attendance</Link>
          <Link to="/events" className="text-gray-300 hover:text-white">Events</Link>
          <button 
            onClick={forgotPassword}
            className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer"
          >Forgot Password</button>
          <button 
            onClick={handleLogout} 
            className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
