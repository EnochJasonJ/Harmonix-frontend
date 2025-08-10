/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await axios.post("https://harmonix-backend.onrender.com/password-reset-confirm/", {
        uid,
        token,
        new_password: password
      });
      toast.success("Password reset successful!");
    } catch (err) {
      toast.error("Password reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
      <input 
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded text-black mb-4"
      />
      <button 
        onClick={handleReset}
        className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded"
      >
        Reset Password
      </button>
    </div>
  );
}

export default ResetPasswordPage;
