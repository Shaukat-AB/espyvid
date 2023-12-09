import Search from "./Search";
import NavBar from "./NavBar";
import Settings from "./Settings";
import SideBarContext from "../context/SideBarContext";
import { useContext, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import { useLocation } from "react-router-dom";
import { BiSearch, BiMenu, BiSolidCaretUpSquare } from "react-icons/bi";

const Header = ({ searchQuery, current }) => {
  const playVid = useLocation().pathname.includes("playVideo");
  const [searchToggle, searchToggler] = useToggle(
    !playVid && window.innerWidth > 699
  );
  const [navToggle, navToggler] = useContext(SideBarContext);
  const width = window.innerWidth

  window.addEventListener("resize", () => {
    if(width == window.innerWidth ) return;
    window.innerWidth > 699 ? searchToggler(true) : searchToggler(false);
    window.innerWidth > 1199 ? !playVid && navToggler(true) : navToggler(false);
  });

  return (
    <header className="header">
      <div className="top-nav">
        <Logo toggler={navToggler} />

        {searchToggle && (
          <Search toggler={searchToggler} searchQuery={searchQuery} />
        )}

        {!searchToggle && (
          <button
            className="btn btn-toggle icon"
            aria-label="toggle search bar"
            onClick={() => searchToggler(true)}
          >
            <BiSearch />
          </button>
        )}

        <Settings />
      </div>

      {navToggle && (
        <NavBar current={current}>
          <Logo toggler={navToggler}></Logo>
        </NavBar>
      )}
    </header>
  );
};

const Logo = ({ toggler }) => {
  return (
    <div className="logo-container">
      <button
        className="btn menu"
        onClick={() => toggler()}
        aria-label="Toggle Menu"
      >
        <BiMenu className="icon" />
      </button>

      <span className="logo">
        <BiSolidCaretUpSquare className="icon" />
        EspyVid
      </span>
    </div>
  );
};

export default Header;
