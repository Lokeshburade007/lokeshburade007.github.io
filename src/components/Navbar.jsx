import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");

function Navigate(){
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');
    toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';
};
  return (
    <div className="container-home">
      <Link to={"/"} className="logo">
        Lokesh Burade.
      </Link>

      <nav className="navbar">
        <NavLink to={"/"}>
          Home
        </NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/services"}>Services</NavLink>
        <NavLink to={"/projects"}>Projects</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        <div className="toggle_btn" onclick="Navigate()">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>
      <div className="dropdown_menu">
        <ul>
          <li>
            <NavLink to={"/"} className="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            <NavLink to={"/services"}>Services</NavLink>
          </li>
          <li>
            <NavLink to={"/projects"}>Projects</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
