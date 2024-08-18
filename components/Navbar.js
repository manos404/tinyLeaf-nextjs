"use client";
import React, { useEffect, useState } from "react";
// import {   useLocation } from "react-router-dom";
import logo from "../images/Small.png";
import logoText from "../images/Tiny Leaf Tea House.png";
import classes from "@/components/Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  // const location = useLocation();
  const path= usePathname()
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(path);
  // const [selectedLink, setSelectedLink] = useState(location.pathname);
  useEffect(() => {
    setSelectedLink(path );
  }, [path]);

  return (
    <header className=  {classes.header} >
      <nav className={`${classes.navbar} ${classes.nav}`}>
        <div className={classes.logo}>
          <Image src={logo} alt=""/>
          <Image src={logoText} alt=""/>
        </div>
        <div
          // className={`menu ${menuOpen ? "open" : ""}`}
          className={`${classes.menu} ${menuOpen ?  classes.open  : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={classes.span}></span>
          <span className={classes.span}></span>
        </div>
        {/* <ul className={menuOpen ? "open" : ""}> */}
        <ul className={`${classes.menu} ${menuOpen ?  classes.open  : ""} ${classes.ul}   `}>
          <li
            className={`${selectedLink === "/" ? classes.selected : ""}  ${classes.li}`}
            onClick={() => {
              // setSelectedLink(1);
              setMenuOpen(false);
            }}
          >
            <Link href="/">Home </Link>
          </li>
          <li
            className={`${selectedLink === "/menu" ? classes.selected : ""}  ${classes.li}`}
            onClick={() => {
              // setSelectedLink(2);
              setMenuOpen(false);
            }}
          >
            <Link href="/menu">Menu </Link>
          </li>
          <li
            className={`${selectedLink === "/reservations" ? classes.selected : ""}  ${classes.li}`}
            onClick={() => {
              // setSelectedLink(3);
              setMenuOpen(false);
            }}
          >
            <Link href="/reservations"> Reservations</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
