import image1 from "@/images/carousel/Img 1.png";
import image2 from "@/images/carousel/egor-lyfar-jHMJrp33sUg-unsplash 1.png";
import image3 from "@/images/carousel/gaelle-marcel-UOJeTKFwoJc-unsplash 1.png";
import image4 from "@/images/carousel/robert-bye-4UGlx_OXqgs-unsplash 1.png";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./ImageCarousel.module.css";
import Image from "next/image";

function ImageCarousel() {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 901,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <h3 style={{ marginTop: "50px" }}>Gallery</h3>

      <div className={classes["slider-container"]}>
        <Slider {...settings}>
          <div className={classes["slider-container"]}>
            <Image src={image1} alt=""/>
          </div>
          <div className={classes["slider-container"]}>
            <Image src={image2} alt=""/>
          </div>
          <div className={classes["slider-container"]}>
            <Image src={image3} alt=""/>
          </div>
          <div className={classes["slider-container"]}>
            <Image src={image4} alt=""/>
          </div>
        </Slider>
      </div>
    </>
  );
}

export default ImageCarousel;
