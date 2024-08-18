import React, { useEffect, useRef, useState } from "react";
import classes from "./WiseLeaves.module.css";

import teacups from "@/images/teacups.png";
import teaPage from "@/images/teaPage.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

export default function WiseLeaves() {
  const [windowWidth, setWindowWidth] = useState();
  const wiseLeavesRef = useRef(null);
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      const animateElements = (element) => {
        if (windowWidth >= 768) {
          gsap.fromTo(
            element,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              stagger: 0.2,
              scrollTrigger: {
                trigger: wiseLeavesRef.current,
                start: "top 50%",
              },
            }
          );
        }
      };
      animateElements(imageRef1.current);
      animateElements(imageRef2.current);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowWidth]);

  return (
    <section
      className={`${classes["wise-leaves"]} container`}
      ref={wiseLeavesRef}
    >
      <div className={classes["background-color"]}></div>
      <div className={classes["wise-leaves-teacups"]}>
        <Image src={teacups} alt="" ref={imageRef1} />
      </div>
      <div className={classes["text-body"]}>
        <h3>Wise Leaf evenings</h3>
        <p>
          Bringing together those with curious minds, speakers and observers
          alike, our Wise Leaf events are a melting pot to share, reflect and
          contemplate.
        </p>
      </div>
      <div className={classes["wise-leaves-image"]}>
        <Image src={teaPage} alt="" ref={imageRef2} />
      </div>
    </section>
  );
}
