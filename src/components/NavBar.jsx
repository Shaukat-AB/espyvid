import {HiHome, HiMusicalNote, HiTv, HiAcademicCap, HiLifebuoy, HiNewspaper, HiCog, } from "react-icons/hi2";
import { Link } from "react-router-dom";

const NavBar = ({ current, children }) => {
  const [active, changeActive] = current;
  const navLinks = [
    { id: 0, title: "Home", icon: <HiHome className="icon" /> },
    { id: 24, title: "Entertainment", icon: <HiTv className="icon" /> },
    { id: 10, title: "Music", icon: <HiMusicalNote className="icon" /> },
    { id: 17, title: "Sports", icon: <HiLifebuoy className="icon" /> },
    { id: 22, title: "People & Blogs", icon: <HiAcademicCap className="icon" /> },
    { id: 2, title: "Autos & Vehicles", icon: <HiCog className="icon" /> },
    { id: 25, title: "News & Politics", icon: <HiNewspaper className="icon" /> },
  ];

  return (
    <nav className="side-bar">
      <ul className="nav-list">
        {children}
        {navLinks.map((navLink) => (
          <li
            key={navLink.id}
            className="nav-item"
            aria-selected={navLink.title === active}
            onClick={() =>
              changeActive({ id: navLink.id, title: navLink.title })
            }
          >
            <Link to="/" className="link">
              {navLink.icon}
              <span>{navLink.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
