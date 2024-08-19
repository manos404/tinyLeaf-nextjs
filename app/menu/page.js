import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import heroImage from "@/images/ImagebyDrewJemmett.png";
import image from "@/images/ImagebyHeatherBarnes.png";
import ReservationHero from "@/components/ReservationHero";
import Menu from "@/components/MenuPage/Menu";
import { fetchMenuData, fetchSpecialMenuData } from "@/lib/menuItems";

 

async function  MenuItems() {
  const menuItems = await fetchMenuData();
  const menuSpecialItems =await fetchSpecialMenuData();
  return <Menu menu={menuItems} specialMenu={menuSpecialItems} />;
}

function MenuPage() {
  return (
    <>
      <Hero headline="Menu" image={heroImage} />
      <Suspense
        fallback={
          <p style={{ textAlign: "center", fontSize: "55px" }}>
            Fetching menu items...
          </p>
        }
      >
        <MenuItems />
      </Suspense>
      <ReservationHero
        image={image}
        title={"Shall we put your name in the tea pot?"}
        text={
          "For anything from a catchup with a long lost friend to a book club gathering... we’re always ready to put the kettle on."
        }
        buttonText={"Reserve a table"}
      />
    </>
  );
}

export default MenuPage;
