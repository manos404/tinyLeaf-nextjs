import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const animateFormIcons = (bigIconRef, smallIconRef) => {
  gsap.fromTo(
    smallIconRef.current,
    { x: -150 },
    {
      scrollTrigger: {
        trigger: smallIconRef.current,
        start: "top center",
        // toggleActions: "restart pause reverse pause"
      },
      x: 0,
      rotation: 360,
      duration: 1,
    }
  );
  gsap.fromTo(
    bigIconRef.current,
    { opacity: 0, x: 150 },
    {
      scrollTrigger: {
        trigger: smallIconRef.current,
        start: "top center",
        // toggleActions: "restart pause reverse pause"
      },
      x: 0,
      opacity: 1,
      rotation: 360,
      duration: 1,
    }
  );
};

export const animateHero = (heroRef) => {
  gsap.fromTo(
    heroRef.current,
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1 }
  );
};

export const animateMenu = (menuRef, specialMenuRef) => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    menuRef.current,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: menuRef.current,
        start: "top 60%",
      },
    }
  );
  gsap.fromTo(
    specialMenuRef.current,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.2,
      scrollTrigger: {
        trigger: specialMenuRef.current,
        start: "top 60%",
      },
    }
  );
};

export const animateOurBlends = (textBodyRef,ourBlendsImageRef,textFeatureRef) => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    textBodyRef.current,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: textBodyRef.current,
        start: "top 50%",
      },
    }
  );
  gsap.fromTo(
    ourBlendsImageRef.current,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: textBodyRef.current,
        start: "top 50%",
      },
    }
  );
  gsap.fromTo(
    textFeatureRef.current,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: textBodyRef.current,
        start: "top 50%",
      },
    }
  );
};
