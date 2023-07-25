import React, { useRef } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
    safe: false,
  },
  {
    path: "/about",
    display: "About",
    safe: false,
  },
  {
    path: "/activities",
    display: "You're Activities",
    safe: true,
  },

  {
    path: "/blogs",
    display: "Blog",
    safe: false,
  },
  {
    path: "/contact",
    display: "Contact",
    safe: false,
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const token = localStorage.getItem("token");

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
                {navLinks
                  .filter((item) => (token ? true : !item.safe))
                  .map((item, index) => (
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "nav__active nav__item"
                          : "nav__item"
                      }
                      key={index}
                    >
                      {item.display}
                    </NavLink>
                  ))}
              </div>
            </div>
            <div className="px-3 px-md-0 flex gap-4">
              {token ? (
                <Badge color="primary" badgeContent={0} showZero>
                  <MailIcon sx={{ color: "white" }} />
                </Badge>
              ) : (
                <>
                  <NavLink to="/login" className="nav__item">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="nav__item">
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
