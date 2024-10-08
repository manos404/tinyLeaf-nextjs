"use client";
import React from "react";
import Hero from "@/components/Hero";
import heroImage from "../images/teapot.png";
import OurBlends from "@/components/homepage/OurBlends";
import WiseLeaves from "@/components/homepage/WiseLeaves";
import ReservationHero from "@/components/ReservationHero";
import ReservationImage from "@/images/ImagebyTinaDawson.png";
import ImageCarousel from "@/components/homepage/ImageCarousel";

function Homepage() {
  return (
    <>
      <Hero headline="A flavour for all seasons" image={heroImage} />
      <OurBlends />
      <WiseLeaves />
      <ReservationHero
        image={ReservationImage}
        title={"Make a reservation"}
        text={
          "For anything from a catchup with a long lost friend to a book club gathering... we’re always ready to put the kettle on."
        }
        buttonText={"Reserve a table"}
      />
      <div
        // style={{ maxHeight: "30%", margin: "auto" }}
        style={{ maxWidth: "90vw", marginLeft: "auto" }}
        // className="container"
      >
        <ImageCarousel className="carousel" />
      </div>
    </>
  );
}

export default Homepage;
