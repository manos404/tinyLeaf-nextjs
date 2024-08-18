import React from "react";

import heroImage from "@/images/ImagebyAlicePasqual.png";
import image from "@/images/ImagebyNathanDumlao.png";
import Hero from "@/components/Hero";
import ReservationHero from "@/components/ReservationHero";
import ReservationForm from "@/components/Reservation/ReservationForm";
import checkAvailability from "@/lib/checkAvailability";

async function ReservationPage() {
  const slots = await checkAvailability("0" );
  //  console.log( slots );
  return (
    <>
      <Hero headline="Reservation" image={heroImage} />
      <ReservationForm slots={slots} />
      <ReservationHero
        image={image}
        title={"No storms in our tea cups"}
        text={
          "We make our blends with love and care, so you can taste aromas from across the globe right here in our tea house"
        }
        buttonText={"See what’s on the menu"}
      />
    </>
  );
}

export default ReservationPage;
