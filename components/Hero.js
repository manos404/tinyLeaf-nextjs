"use client";

import React, { useEffect, useRef } from "react";
import classes from "@/components/Hero.module.css"; // Ελέγξτε αν η διαδρομή είναι σωστή
import gsap from "gsap";
import { animateHero } from "@/lib/animations";

export default function Hero({ headline, image }) {
  const darkImageStyle = {
    backgroundImage: `url(${image.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(70%)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  const heroRef = useRef(null);

  useEffect(() => {
    animateHero(heroRef);
  }, []);

  return (
    <section className={classes.hero}>
      <div style={darkImageStyle}></div>
      <div
        className={classes.heroText}
        style={{ position: "relative", zIndex: 1 }}
        ref={heroRef}
      >
        <h1>{headline}</h1>
      </div>
    </section>
  );
}
