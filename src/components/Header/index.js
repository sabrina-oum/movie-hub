import { useState, useEffect, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import ContentWrapper from "../ContentWrapper";
import "./style.scss";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
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

  return (
    <header className={`header ${mobileMenu ? "header--mobile" : ""} ${show}`}>
      <ContentWrapper>
        <NavLink to="/" className="header__logo">
          MovieHub
        </NavLink>
        <ul className="header__menu">
          <li className="header__item">
            <NavLink to="/" className="header__link">
              Home
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink to="/explore/movie" className="header__link">
              Movies
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink to="/explore/tv" className="header__link">
              TV Shows
            </NavLink>
          </li>
          <li className="header__item">
            <HiOutlineSearch onClick={openSearchHandler} />
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
      </ContentWrapper>
      {showSearch && (
        <div className="header__search-bar">
          <ContentWrapper>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
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
