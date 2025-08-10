import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import logo from '../assets/Logo Design.png';
import bandBg from '../assets/bandBg.jpg';
function HomePage() {

    return (
    <div className="w-full min-h-screen text-white bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bandBg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 p-6">
          <img src={logo} alt="Harmonix Logo" className="w-40 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Harmonix</h1>
          <p className="text-lg max-w-xl mx-auto mb-6">
            The heart and soul of our college for over a decade.  
            Spreading music, energy, and memories since day one.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/events"
              className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
            >
              See Our Events
            </Link>
            <Link
              to="/member"
              className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold"
            >
              Meet the Band
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="flex bg-white text-black flex-row items-center justify-between py-16 px-20 w-full  mx-auto text-center gap-[20px]">
        <h2 className="text-5xl w-full text-left font-bold mb-4">Our Story</h2>
        <p className=" text-lg text-left w-full">
          Harmonix was born a decade ago in the heart of our campus,  
          blending passion, talent, and friendship into every note we play.  
          From small jam sessions to headlining college fests, we’ve grown into  
          a tradition that’s passed from one generation of students to the next.
        </p>
      </section>

      {/* Events Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl text-[#141414] font-bold mb-6 text-center">Upcoming Events</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Example event cards */}
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold text-black text-lg mb-2">Independence Day Celebration</h3>
              <p className="text-sm text-[#141414]">Aug 15, College Pathway</p>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold text-black text-lg mb-2">Flashmob</h3>
              <p className="text-sm text-[#141414]">Sep 10, Inner OAT</p>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold text-black text-lg mb-2">Freshwarites</h3>
              <p className="text-sm text-[#141414]">Sep 26, OAT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Harmonix | A decade of music at Our College
      </footer>
    </div>
  );
};


export default HomePage