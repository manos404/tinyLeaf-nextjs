import React from "react";

import Hero from "../components/Hero";
import OurBlends from "../components/OurBlends";
import WiseLeaves from "../components/WiseLeaves";
import Reservation from "../components/Reservation";
import heroImage from "../images/teapot.png";
import ReservationImage from "../images/ImagebyTinaDawson.png";
import ImageCarousel from "../components/ImageCarousel";

function Homepage() {
  return (
    <>
      <Hero headline="A flavour for all seasons" image={heroImage} />
      <OurBlends />
      <WiseLeaves />
      <Reservation
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
