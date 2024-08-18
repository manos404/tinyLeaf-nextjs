"use client";
import React from "react";

// import { useNavigate } from "react-router-dom";
import classes from "./ReservationHero.module.css";

import Link from "next/link";

export default function ReservationHero({ image, title, text, buttonText }) {
  //   let navigate = useNavigate();
  const darkImageStyle = {
    backgroundImage: `url(${image.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(50%)", // Μειώνει τη φωτεινότητα της εικόνας στο 50%
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <section
      className={`hero ${classes.reservation}`}
      style={{
        position: "relative",
      }}
    >
      <div style={darkImageStyle}></div>
      <div
        className={`${classes["reservation-text"]}`}
        style={{ position: "relative", zIndex: 1 }}
      >
        <h1>{title}</h1>
        <p>{text}</p>
        <Link href={buttonText.includes("menu") ? "/menu" : "/reservations"}>
          <button className={`${classes["reservation-button"]}`}>
            {buttonText}
          </button>
        </Link>
      </div>
    </section>
  );
}
