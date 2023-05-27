import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import "./style.scss";
import ContentWrapper from "../ContentWrapper";
import { useAuthContext } from "../../context/AuthContext";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const { currentUser, logout } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY, mobileMenu]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, controlNavbar]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };

  const openMobileMenuHandler = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const closeMobileMenuHandler = () => {
    setMobileMenu(false);
  };

  const openSearchHandler = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const closeSearchHandler = () => {
    setShowSearch(false);
  };

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log("Couldn't logout" + err);
    }
  };

  return (
    <header className={`header ${mobileMenu ? "header--mobile" : ""} ${show}`}>
      <ContentWrapper>
        <Link to="/" className="header__logo">
          MovieHub
        </Link>
        {currentUser && (
          <>
            <ul className="header__menu">
              <li className="header__item">
                <Link to="/" className="header__link">
                  Home
                </Link>
              </li>
              <li className="header__item">
                <Link to="/explore/movie" className="header__link">
                  Movies
                </Link>
              </li>
              <li className="header__item">
                <Link to="/explore/tv" className="header__link">
                  TV Shows
                </Link>
              </li>
              <li className="header__item">
                <HiOutlineSearch onClick={openSearchHandler} />
              </li>
              <li className="header__item">
                <Link onClick={logoutHandler} className="header__link">
                  Logout
                </Link>
              </li>
            </ul>
            <div className="header__mobile-menu">
              <HiOutlineSearch onClick={openSearchHandler} />
              {mobileMenu ? (
                <VscChromeClose onClick={closeMobileMenuHandler} />
              ) : (
                <SlMenu onClick={openMobileMenuHandler} />
              )}
            </div>
          </>
        )}
      </ContentWrapper>
      {showSearch && (
        <div className="header__search-bar">
          <ContentWrapper>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={closeSearchHandler} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
