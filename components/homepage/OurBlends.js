"use client";
import React, { useEffect, useRef } from "react";
import classes from "@/components/homepage/OurBlends.module.css";
import teaLeaves from "@/images/teaLeaves.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateOurBlends } from "@/lib/animations";
4;
// gsap.registerPlugin(ScrollTrigger);

export default function OurBlends({ headline }) {
 
  const textBodyRef = useRef(null);
  const ourBlendsImageRef = useRef(null);
  const textFeatureRef = useRef(null);
  useEffect(() => {
    animateOurBlends(textBodyRef, ourBlendsImageRef, textFeatureRef);
  }, []);

  return (
    <section className={` ${classes["our-blends"]} container `}>
      <div className={classes.text}>
        <div className={classes["text--body"]} ref={textBodyRef}>
          <h3>Our blends</h3>
          <p>
            We make our very own Tiny Leaf blends right here in the tea house,
            offering new flavours according to the season. We source all our
            produce sustainably and make sure the hands that laboured for our
            flavoursome cups were rewarded fairly.
          </p>
        </div>
        <div className={classes["text--feature"]} ref={textFeatureRef}>
          <hr className={classes["text--feature-line"]} />
          <h4>Hand-picked and sustainable</h4>
        </div>
      </div>
      <div className={classes["our-blends-image"]} ref={ourBlendsImageRef}>
        <img src={teaLeaves.src} alt="" />
      </div>
    </section>
  );
}
