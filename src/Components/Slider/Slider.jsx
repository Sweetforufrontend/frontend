import React, { useState, useEffect } from "react";
import css from "./Slider.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const Slider = () => {
  const [slideNo, setSlideNo] = useState(0);
  const [iconSize, setIconSize] = useState(30);
  // const [time, setTime] = useState(Date.now());
  // const slides = [
  //   {
  //     id: 0,
  //     url: "https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/w-qjCHPZbeXCQ-unsplash.jpg",
  //   },
  //   {
  //     id: 1,
  //     url: "https://images.pexels.com/photos/5084352/pexels-photo-5084352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     url: "https://images.pexels.com/photos/7133658/pexels-photo-7133658.jpeg?auto=compress&cs=tinysrgb&w=800",
  //   },
  //   {
  //     id: 3,
  //     url: "https://images.pexels.com/photos/7133656/pexels-photo-7133656.jpeg?auto=compress&cs=tinysrgb&w=800",
  //   },
  // {
  //   url: "https://images.pexels.com/photos/5084352/pexels-photo-5084352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // },
  // {
  //   url: "https://images.pexels.com/photos/5084352/pexels-photo-5084352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // },
  // {
  //   url: "https://images.pexels.com/photos/5084352/pexels-photo-5084352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // },
  // ];

  //   useEffect(() => {
  // if (slideNo === slides.length) {
  //   setSlideNo(0);
  // } else {
  //   setSlideNo(slideNo + 1);
  // }

  // setTimeout(() => {
  //     setCount((count) => count + 1);
  //   }, 1000);
  // const interval = setInterval(() =>
  // if (slideNo === slides.length) {
  //   setSlideNo(0);
  // } else {
  //   alert("hii");
  //   setSlideNo(slideNo + 1);
  // }
  // return () => {
  //   clearInterval(interval);
  // }
  //   }, [])

  const banners = [
    {
      id: 0,
      source: [
        "/bannermobile-compressed/bannermobile.jpg",
        "/bannerpc-compressed/bannerpc1.jpg",
      ],
    },
    {
      id: 1,
      source: [
        "/bannermobile-compressed/orangmobile.jpg",
        "/bannerpc-compressed/orangepc.jpg",
      ],
    },
    {
      id: 2,
      source: [
        "/bannermobile-compressed/redmobile.jpg",
        "/bannerpc-compressed/pcbanner.jpg",
      ],
    },
    {
      id: 3,
      source: [
        "/bannermobile-compressed/yellowmobile.jpg",
        "/bannerpc-compressed/yellowpc.jpg",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (slideNo === banners.length - 1) {
        setSlideNo(0);
      } else {
        // alert("hii");
        // alert(slideNo);
        setSlideNo(slideNo + 1);
        // alert(slideNo+1);
      }
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [slideNo]);

  const toggleLeft = () => {
    if (slideNo <= 0) {
      // alert("hii");
      setSlideNo(banners.length - 1);
    } else {
      setSlideNo(slideNo - 1);
    }
  };

  const toggleRight = () => {
    if (slideNo === banners.length - 1) {
      setSlideNo(0);
    } else {
      setSlideNo(slideNo + 1);
    }
  };
  return (
    <div className={css.container}>
      <div
        // style={{ backgroundImage: `url(${slides[slideNo].url})` }}
        className={css.imageContainer}
      >
        <div
          style={{
            width: "100%",
            height: "auto",
            transition: "opacity 2s ease-in-out",
          }}
        >
          <picture
            style={{
              width: "100%",
              height: "auto",
              transition: "opacity 0.5s linear",
            }}
          >
            <source
              media="(max-width: 768px)"
              srcSet={banners[slideNo].source[0]}
            />
            <source
              media="(min-width: 768px)"
              srcSet={banners[slideNo].source[1]}
            />
            <img
              src="/red.jpg"
              alt=""
              className="image"
              style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
            />
          </picture>
        </div>

        {/* <img src="/red.png" alt="" style={{width: "100%", height: "auto"}}/> */}
        <div className={css.sliderLeft}>
          <FiChevronLeft
            size={iconSize}
            color={"#FFFFFF"}
            className={css.icons}
            onClick={toggleLeft}
          />
        </div>
        <div className={css.sliderRight}>
          <FiChevronRight
            size={iconSize}
            color={"#FFFFFF"}
            className={css.icons}
            onClick={toggleRight}
          />
        </div>
      </div>
      <div className={css.bottomDots}>
        {banners.map((no) => {
          //   console.log(no.id);
          var l = no.id;
          // console.log(l);

          if (l <= slideNo) {
            return (
              <div
                className="dot"
                style={
                  {
                    //   color: "green",
                    // backgroundColor: "green",
                    // width: "0.5rem",
                    // height: "0.5rem",
                    // margin: "0.2rem",
                    // cursor: "pointer",
                  }
                }
                onClick={() => {
                  setSlideNo(l);
                }}
              ></div>
            );
          } else if (l > slideNo) {
            return (
              <div
                className="dot"
                style={{
                  backgroundColor: "yellow",
                }}
                onClick={() => {
                  setSlideNo(l);
                }}
              ></div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Slider;
