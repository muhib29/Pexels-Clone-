import React, { useEffect, useState } from "react";
import "../index.css";

const Navbar = ({ query, setQuery }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`${
        isSticky ? "navbar sticky" : "navbar"
      } flex md:justify-between items-center px-6 md:px-10 py-4 text-lg font-semibold bg-transparent text-white z-10`}
    >
      <div className="flex justify-between items-center w-full md:w-auto">
        <div
          className={`flex items-center gap-4 cursor-pointer ${
            isSticky ? "text-slate-900" : "text-white"
          }`}
        >
          <img
            className="w-10 md:w-16 rounded-lg"
            src="https://seeklogo.com/images/P/pexels-logo-EFB9232709-seeklogo.com.png"
            alt="Pexels"
          />
          <span className="text-xl md:text-3xl hidden md:block">Pexels</span>
          <div
            className={`${
              isSticky ? "flex" : "hidden"
            } items-center gap-4 w-full md:w-[46vw] bg-gray-100 text-black rounded-xl px-4 py-2`}
          >
            <button className="flex items-center gap-2 p-2 px-4 rounded-lg font-semibold text-base md:text-xl">
              <i className="fa-regular fa-image"></i>
              Photos
              <i className="fa-solid fa-angle-down ml-1"></i>
            </button>
            <input
              placeholder="Search for free photos"
              className="flex-grow text-gray-500 bg-gray-100 text-base md:text-lg outline-none"
              type="text"
              value={query}
              onChange={handleChange}
            />
            <i className="fa-solid fa-magnifying-glass text-xl hover:text-green-500 cursor-pointer"></i>
          </div>
        </div>
        <button
          className="md:hidden text-3xl"
          aria-label="Toggle menu"
          onClick={handleMenuClick}
        >
          <i className={`fa-solid z-10 ${isMenuOpen ? "fa-times " : "fa-bars"}`}></i>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white rounded-lg p-4 z-20 shadow-lg md:hidden">
          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer">Explore</li>
            <li className="cursor-pointer">License</li>
            <li className="cursor-pointer">Upload</li>
            <li className="cursor-pointer">Join</li>
          </ul>
        </div>
      )}

      <ul className="hidden md:flex gap-6 items-center text-xl">
        <li
          className={`cursor-pointer ${
            isSticky ? "hover:text-black" : "hover:text-slate-100"
          }`}
        >
          Explore
        </li>
        <li
          className={`cursor-pointer ${
            isSticky ? "hover:text-black" : "hover:text-slate-100"
          }`}
        >
          License
        </li>
        <li
          className={`cursor-pointer ${
            isSticky ? "hover:text-black" : "hover:text-slate-100"
          }`}
        >
          Upload
        </li>
        <li
          className={`cursor-pointer ${
            isSticky ? "hover:text-black" : "hover:text-slate-100"
          }`}
        >
          <i className="fa-solid fa-ellipsis"></i>
        </li>
        <li
          className={`cursor-pointer px-5 py-3 rounded-md ${
            isSticky ? "bg-[#05a081] text-white" : "bg-white text-black"
          }`}
        >
          Join
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
