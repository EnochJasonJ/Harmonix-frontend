import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './views/LoginForm';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import MemberPage from './pages/MemberPage';
import AttendancePage from './pages/AttendancePage';
import EventsPage from './pages/EventsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("access") !== null);

  // This listens to login/logout changes via localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("access") !== null);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
    <Navbar setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/attendance" element = {<AttendancePage></AttendancePage>} />
        <Route path="/events" element = {<EventsPage></EventsPage>} />
        <Route
          path="/"
          element={
            isLoggedIn
              ? <><HomePage /></>
              : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
        <Route path='/member' element={<MemberPage />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      {/* This Toaster component will display toast notifications */}
    </BrowserRouter>
  );
}

export default App;
