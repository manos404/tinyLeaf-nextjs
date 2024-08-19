import React from "react";

import classes from "./Footer.module.css";
import logo from "../images/Ellipse 4.png";
import logoText from "../images/Tiny Leaf Tea House.png";
import Image from "next/image";

export default function Footer() {
  return (
    <section style={{bottom:"0" }}>
      <footer className={classes["footer"]}>
        <div className={classes["footer--logo"]}>
          <div className={classes["footer-image"]}>
            <Image src={logo} alt="" />
          </div>
          <div>
            <Image src={logoText} alt="" />
          </div>
        </div>
        <div className={classes["footer-content"]}>
          <div>
            <p>Opening hours</p>
            <p>Mon - Sat 11am - 11pm </p>
            <p>Sun 11am - 10pm</p>
          </div>
          <div>
            <p>Address</p>
            <p>24 Brew Lane</p>
            <p>BR3 WL Cuptown</p>
          </div>
          <div>
            <p>Contact</p>
            <p>+44 201 998 7562</p>
            <p>hello@yellowmountain.com</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
