import React, { useRef } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Container, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/activities",
    display: "You're Activities",
  },

  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Header = () => {
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="px-3 px-md-0">
              <Badge color="primary" badgeContent={0} showZero>
                <MailIcon sx={{ color: "white" }} />
              </Badge>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
