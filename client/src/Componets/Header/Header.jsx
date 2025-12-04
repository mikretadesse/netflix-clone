import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isScrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setProfileOpen(false); // close profile if menu opens
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setMenuOpen(false); // close menu if profile opens
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      // encodeURIComponent ensures spaces and special characters work
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className={`${Styles.header} ${isScrolled ? Styles.scrolled : ""}`}>
      {/* Left Section */}
      <div className={Styles.header_left}>
        <img
          className={Styles.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        {/* Mobile Hamburger */}
        <div className={Styles.menu_btn} onClick={toggleMenu}>
          {menuOpen ? (
            <CloseIcon className={Styles.icon} />
          ) : (
            <MenuIcon className={Styles.icon} />
          )}
        </div>

        {/* Navigation */}
        <nav
          className={`${Styles.nav_links} ${menuOpen ? Styles.active : ""}`}
          onClick={() => setMenuOpen(false)}>
          <Link to="/">Netflix</Link>
          <Link to="/">Home</Link>
          <Link to="/tv-shows">TV Shows</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/latest">Latest</Link>
          <Link to="/my-list">My List</Link>
          <Link to="/browse-languages">Browse by Languages</Link>
        </nav>
      </div>

      {/* Right Section */}
      <div className={Styles.header_right}>
        {/* Desktop-only icons */}
        <div className="d-none d-md-flex align-items-center gap-2"></div>
        {/* Netflix-style Search */}
        <div className={Styles.search_container}>
          <SearchIcon
            className={Styles.icon}
            onClick={() => setShowSearch(!showSearch)}
          />
          {showSearch && (
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown} // just use this one
              className={Styles.search_input}
              autoFocus
            />
          )}
        </div>
        <div className={Styles.icon}>
          <NotificationsIcon />
        </div>

        {/* Profile */}
        <div className={Styles.profile_section}>
          <button
            className="btn d-flex align-items-center gap-1 p-0 border-0 bg-transparent profile_icon"
            onClick={toggleProfile}
            aria-expanded={profileOpen}>
            <PersonIcon className={Styles.icon} />
            <ArrowDropDownIcon className={Styles.icon} />
          </button>

          {profileOpen && (
            <div className={`${Styles.profile_dropdown}`}>
              <a href="#">Account</a>
              <a href="#">Help Center</a>
              <a href="#">Sign Out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
