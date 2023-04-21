import React from "react";
import { useState, useEffect } from "react";
import css from "./singleProduct.module.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useParams } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";
import "swiper/css";
import { addItemsToCart } from "../../actions/cartActions";
import lottie from "lottie-web";
import reactLogo from "../../animation/confetti.json";
import { FaTruck } from "react-icons/fa";
import Alert from "../layout/Alert/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountDownTimer from "../layout/CountDownTimer/CountDownTimer";
import FeaturedProducts from "../products/FeaturedProducts/FeaturedProducts";
import { Checkbox } from "@mui/material";

var delivery_time = 4;

const dispatch_today = 12;

const months = [
  {
    name: "Jan",
    days: 31,
  },
  { name: "Feb", days: 28 },
  { name: "Mar", days: 31 },
  { name: "Apr", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "Aug", days: 31 },
  { name: "Sept", days: 30 },
  { name: "Oct", days: 31 },
  { name: "Nov", days: 30 },
  { name: "Dec", days: 31 },
];

var presentmonth = "";
var deliverymonth1 = "";
var deliverByfirstvalue = "";
var deliverBysecondvalue = "";
var deliverymonth2 = "";
var index = "";
var timerange = 2;

const SingleProduct = () => {
  let currentDate = new Date();
  var hoursMinSecs = { hours: 0, minutes: 0, seconds: 0 };
  // console.log(time);
  var date = currentDate.toString();
  // console.log(date);

  var day = date.split(" ");

  console.log("presenttime", day[4]);

  var time = day[4].toString();
  // setMonth(day[0]);
  // alert(day)
  presentmonth = day[1];
  // presentmonth = "Feb"; // changed

  var fulltime = date.split(" ")[4].split(":");

  // // fulltime[0] = 8;
  // // fulltime[1] = 0;
  // // fulltime[2] = 0;
  // // day[2] = 18;
  // if (fulltime[0] < 12) {
  //   var time = day[4].split(":");
  //   return (
  //     setShowtimer("flex"),
  //     (hoursMinSecs = {
  //       hours: 11 - Number(fulltime[0]),
  //       minutes: 59 - Number(fulltime[1]),
  //       seconds: 59 - Number(fulltime[2]),
  //     })
  //   );
  // } else {
  //   return setShowtimer("none");
  // }
  const deliveryTimeCalculator = () => {
    // console.log("called");
    if (Number(fulltime[0]) < 12) {
      delivery_time = 4;
      const result = months.find((month) => month.name === presentmonth);
      console.log(result.days);
      index = months.findIndex((month) => month.name === presentmonth);

      if (Number(day[2]) + delivery_time < result.days) {
        console.log("bruh");
        deliverymonth1 = presentmonth;
        deliverByfirstvalue = Number(day[2]) + delivery_time;
        index = months.findIndex((month) => month.name === presentmonth);
        // console.log("l",result.days)
        if (Number(day[2]) + delivery_time + 2 > result.days) {
          if (index === months.length - 1) {
            deliverymonth2 = months[0].name;
            var totaldays = Number(day[2]) + delivery_time - months[0].days;
            if (totaldays === 0) {
              deliverBysecondvalue = totaldays + 3;
            } else {
              deliverBysecondvalue = totaldays + 2;
            }
            // deliverBysecondvalue = totaldays;
          } else {
            deliverymonth2 = months[index + 1].name;
            var totaldays = Number(day[2]) + delivery_time - months[0].days;
            if (totaldays === 0) {
              deliverBysecondvalue = totaldays + 3;
            } else {
              deliverBysecondvalue = totaldays + 2;
            }
            // deliverBysecondvalue = totaldays;
          }

          // deliverymonth2 = months[index + 1].name;
          // var totaldays = Number(day[2]) + delivery_time - months[0].days;
          // deliverBysecondvalue = totaldays;
        } else {
          deliverymonth2 = presentmonth;
          deliverBysecondvalue = Number(day[2]) + delivery_time + 2;
        }
        // deliverBysecondvalue = Number(deliverByfirstvalue) + 2;
      } else {
        console.log("bruh2");
        if (index === months.length - 1) {
          deliverymonth1 = months[0].name;
          var totaldays = Number(day[2]) + delivery_time - months[0].days;
          if (totaldays === 0) {
            deliverByfirstvalue = 1;
          } else {
            deliverByfirstvalue = totaldays;
          }
          // deliverByfirstvalue = totaldays;
          // deliverBysecondvalue = totaldays + 2;
          // console.log(deliverymonth1.days)
          const sex = months.find((month) => month.name === deliverymonth1);
          index = months.findIndex((month) => month.name === deliverymonth1);
          if (Number(day[2]) + delivery_time + 2 > sex.days) {
            console.log("this is true");
            deliverymonth2 = months[index].name;
            var totaldays = Number(day[2]) + delivery_time - months[0].days;
            if (totaldays === 0) {
              deliverBysecondvalue = totaldays + 3;
            } else {
              deliverBysecondvalue = totaldays + 2;
            }
          } else {
            deliverymonth2 = presentmonth;
            deliverBysecondvalue = Number(day[2]) + delivery_time + 2;
          }
        } else {
          console.log(
            "k"
            // Number(day[2]) + delivery_time + 2 > deliverymonth1.days
          );
          // console.log(Number(day[2]) + delivery_time + 2);
          // console.log(deliverymonth1);
          // const sex = months.find((month) => month.name === deliverymonth1);
          // console.log(sex.days);

          deliverymonth1 = months[index + 1].name;
          var totaldays = Number(day[2]) + delivery_time - months[0].days;
          if (totaldays === 0) {
            deliverByfirstvalue = 1;
          } else {
            deliverByfirstvalue = totaldays;
          }

          const sex = months.find((month) => month.name === deliverymonth1);
          index = months.findIndex((month) => month.name === deliverymonth1);
          // console.log(sex.days);
          // console.log(
          //   "k",
          //   Number(day[2]) + delivery_time + 2 > sex.days
          // );
          if (Number(day[2]) + delivery_time + 2 > sex.days) {
            console.log("hii");
            if (index === months.length) {
              deliverymonth2 = months[0].name;
              var totaldays = Number(day[2]) + delivery_time - months[0].days;
              if (totaldays === 0) {
                deliverBysecondvalue = totaldays + 3;
              } else {
                deliverBysecondvalue = totaldays + 2;
              }
              // deliverBysecondvalue = totaldays;
              console.log("hii");
            } else {
              console.log("blah");
              deliverymonth2 = months[index].name;

              var totaldays =
                Number(day[2]) + delivery_time - months[index].days;
              console.log(totaldays);
              if (totaldays === 0) {
                deliverBysecondvalue = totaldays + 3;
              } else {
                deliverBysecondvalue = totaldays + 2;
              }
              // console.log(deliverymonth2)
              // console.log(Number(day[2]) + delivery_time - months[index].days)
              // deliverBysecondvalue = totaldays;
              // console.log("hello");
            }
          } else {
            deliverymonth2 = deliverymonth1;
            deliverBysecondvalue = Number(day[2]) + delivery_time + 2;
            console.log("heya");
          }

          // deliverBysecondvalue = totaldays + 2;
        }
      }
    } else {
      // alert("jai");
      delivery_time = 6;
      const result = months.find((month) => month.name === presentmonth);
      console.log("result", result.days);
      index = months.findIndex((month) => month.name === presentmonth);

      if (Number(day[2]) + delivery_time < result.days) {
        console.log("bruh");
        deliverymonth1 = presentmonth;
        deliverByfirstvalue = Number(day[2]) + delivery_time;
        index = months.findIndex((month) => month.name === presentmonth);
        // console.log("l",result.days)
        if (Number(day[2]) + delivery_time + 2 > result.days) {
          if (index === months.length - 1) {
            deliverymonth2 = months[0].name;
            var totaldays = Number(day[2]) + delivery_time - months[0].days;
            // deliverBysecondvalue = totaldays;
            if (totaldays === 0) {
              deliverBysecondvalue = totaldays + 3;
            } else {
              deliverBysecondvalue = totaldays + 2;
            }
          } else {
            deliverymonth2 = months[index + 1].name;
            var totaldays = Number(day[2]) + delivery_time - months[0].days;
            if (totaldays === 0) {
              deliverBysecondvalue = totaldays + 3;
            } else {
              deliverBysecondvalue = totaldays + 2;
            }
            // deliverBysecondvalue = totaldays;
          }

          // deliverymonth2 = months[index + 1].name;
          // var totaldays = Number(day[2]) + delivery_time - months[0].days;
          // deliverBysecondvalue = totaldays;
        } else {
          deliverymonth2 = presentmonth;
          deliverBysecondvalue = Number(day[2]) + delivery_time + 2;
        }
        // deliverBysecondvalue = Number(deliverByfirstvalue) + 2;
      } else {
        console.log("bruh2vvvv");
        if (index === months.length - 1) {
          console.log("x");
          var totaldays = Number(day[2]) + delivery_time - months[0].days;
          console.log(totaldays);
          if (totaldays === 0) {
            deliverymonth1 = presentmonth;
            console.log(presentmonth);
            const result = months.find((month) => month.name === presentmonth);
            deliverByfirstvalue = result.days;
          } else {
            console.log("else", presentmonth);
            index = months.findIndex((month) => month.name === presentmonth);
            deliverymonth1 = months[0].name;
            const result = months.find(
              (month) => month.name === deliverymonth1
            );
            // deliverByfirstvalue = result.days;
            var totaldays = Number(day[2]) + delivery_time - months[index].days;
            deliverByfirstvalue = totaldays;
            // Number(day[2]) + delivery_time - months[0].days;
            // var totaldays = Number(day[2]) + delivery_time - months[index].days;
            // console.log("sbcjhbcjhdsa", totaldays)

            // if (totaldays === 0) {
            //   deliverBysecondvalue = totaldays + 2;
            // } else {
            //   deliverBysecondvalue = totaldays + 1;
            // }
            const sex = months.find((month) => month.name === deliverymonth1);
            index = months.findIndex((month) => month.name === deliverymonth1);
            // console.log(sex.days);
            // console.log(
            //   "k",
            //   Number(day[2]) + delivery_time + 2 > sex.days
            // );
            if (Number(day[2]) + delivery_time + 2 > sex.days) {
              console.log("hii");
              if (index === months.length) {
                deliverymonth2 = months[0].name;
                var totaldays = Number(day[2]) + delivery_time - months[0].days;
                // deliverBysecondvalue = totaldays;
                if (totaldays === 0) {
                  deliverBysecondvalue = totaldays + 3;
                } else {
                  deliverBysecondvalue = totaldays + 2;
                }
                console.log("hii");
              } else {
                console.log("blah");
                deliverymonth2 = months[index].name;

                var totaldays =
                  Number(day[2]) + delivery_time - months[index].days;
                console.log(totaldays);
                if (totaldays === 0) {
                  deliverBysecondvalue = totaldays + 3;
                } else {
                  deliverBysecondvalue = totaldays + 2;
                }
                // console.log(deliverymonth2)
                // console.log(Number(day[2]) + delivery_time - months[index].days)
                // deliverBysecondvalue = totaldays;
                // console.log("hello");
              }
            } else {
              deliverymonth2 = deliverymonth1;
              deliverBysecondvalue = Number(day[2]) + delivery_time + 2;
              console.log("heya");
            }
          }
          // deliverymonth1 = months[0].name;
          // var totaldays = Number(day[2]) + delivery_time - months[0].days;

          // if (totaldays === 0) {
          //   console.log("1")
          //   deliverByfirstvalue = 0;
          // } else {
          //   deliverByfirstvalue = totaldays;
          // }

          // deliverByfirstvalue = totaldays;
          // deliverBysecondvalue = totaldays + 2;
          // console.log(deliverymonth1.days)

          // ********** changed ********************************

          const sex = months.find((month) => month.name === deliverymonth1);
          index = months.findIndex((month) => month.name === deliverymonth1);
          if (Number(day[2]) + delivery_time + 2 > sex.days) {
            console.log("this is true");
            console.log("index", index);
            if (index === months.length - 1) {
              deliverymonth2 = months[0].name;
              var totaldays = Number(day[2]) + delivery_time - months[0].days;
              // console.log("sbcjhbcjhdsa", totaldays)
              if (totaldays === 0) {
                deliverBysecondvalue = totaldays + 2;
              } else {
                deliverBysecondvalue = totaldays + 1;
              }
            } else {
              if (index === months.length - 1) {
                deliverymonth2 = months[+1].name;
                var totaldays = Number(day[2]) + delivery_time - months[0].days;
                // console.log("sbcjhbcjhdsa", totaldays)
                if (totaldays === 0) {
                  deliverBysecondvalue = totaldays + 2;
                } else {
                  deliverBysecondvalue = totaldays + 1;
                }
              }
            }
          } else {
            deliverymonth2 = presentmonth;
            deliverBysecondvalue = Number(day[2]) + delivery_time + 2;
          }
        } else {
          console.log(
            "k"
            // Number(day[2]) + delivery_time + 2 > deliverymonth1.days
          );
          // console.log(Number(day[2]) + delivery_time + 2);
          // console.log(deliverymonth1);
          // const sex = months.find((month) => month.name === deliverymonth1);
          // console.log(sex.days);

          deliverymonth1 = months[index + 1].name;
          var totaldays = Number(day[2]) + delivery_time - months[0].days;
          if (totaldays === 0) {
            deliverByfirstvalue = 1;
          } else {
            deliverByfirstvalue = totaldays;
          }

          const sex = months.find((month) => month.name === deliverymonth1);
          index = months.findIndex((month) => month.name === deliverymonth1);
          // console.log(sex.days);
          // console.log(
          //   "k",
          //   Number(day[2]) + delivery_time + 2 > sex.days
          // );
          if (Number(day[2]) + delivery_time + 2 > sex.days) {
            console.log("hii");
            if (index === months.length) {
              deliverymonth2 = months[0].name;
              var totaldays = Number(day[2]) + delivery_time - months[0].days;
              // deliverBysecondvalue = totaldays;
              if (totaldays === 0) {
                deliverBysecondvalue = totaldays + 3;
              } else {
                deliverBysecondvalue = totaldays + 2;
              }
              console.log("hii");
            } else {
              console.log("blah");
              deliverymonth2 = months[index].name;

              var totaldays =
                Number(day[2]) + delivery_time - months[index].days;
              console.log(totaldays);
              if (totaldays === 0) {
                deliverBysecondvalue = totaldays + 3;
              } else {
                deliverBysecondvalue = totaldays + 2;
              }
              // console.log(deliverymonth2)
              // console.log(Number(day[2]) + delivery_time - months[index].days)
              // deliverBysecondvalue = totaldays;
              // console.log("hello");
            }
          } else {
            deliverymonth2 = deliverymonth1;
            deliverBysecondvalue = Number(day[2]) + delivery_time + 2;
            console.log("heya");
          }

          // deliverBysecondvalue = totaldays + 2;
        }
      }
    }
  };
  // fulltime[0]
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [price, setPrice] = useState(0);
  const [iD, setID] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  // const []

  const [sname, setSname] = useState("");
  const [checked, setChecked] = useState(false);
  const [shelflifeClicked, setShelfLifeClicked] = useState(false);
  const [descriptionClicked, setDescriptionsClicked] = useState(false);

  const [imageVal, setImageVal] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  var showtimer = "";

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState({
    name: "",
    price: 0,
    ratings: 0,
    numofreviews: 0,
    description: "",
  });

  useEffect(() => {
    dispatch(getProductDetails(id));
    // var images = product.images[0]
  }, [dispatch, id]);

  const addCartHandler = () => {
    dispatch(addItemsToCart(id, quantity, sname));
    // alert("Item added to cart");
    toast.success("Item Added To Cart!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  useEffect(() => {
    if (product != undefined) {
      setImageVal(product.images[0].url);
      setName({
        name: product.name,
        price: product.price,
        ratings: product.ratings,
        numofreviews: product.numOfReviews,
        description: product.description,
      });
      setPrice(product.price);
      setFirst(product.images[0].url);
      setSecond(product.images[1].url);
      setThird(product.images[2].url);
      setFourth(product.images[3].url);
    }
  }, [product]);

  const handleMinus = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleCheckboxChange = (event, p, n, i, ass) => {
    setID(i);

    if (firstTime === false) {
      document.getElementById(`${iD}`).checked = false;
    }

    if (document.getElementById(`${i}`).checked === true) {
      if (ass == true) {
        document.querySelector("#animation").style.display = "flex";

        lottie.loadAnimation({
          container: document.querySelector("#animation"),
          animationData: reactLogo,
          loop: false,
        });

        setTimeout(() => {
          document.querySelector("#animation").style.display = "none";
        }, 3000);
      }
      setPrice(p);
      setSname(n);
      setFirstTime(false);
    }

    document.getElementById("container").scrollIntoView();

    if (document.getElementById(`${i}`).checked === false) {
      setPrice(name.price);
      setSname("");
      setFirstTime(true);
    }
  };

  const showTimer = () => {
    var fulltime = date.split(" ")[4].split(":");

    fulltime[0] = 11;
    fulltime[1] = 0;
    fulltime[2] = 0;
    // day[2] = 18;
    if (fulltime[0] < 12) {
      var time = day[4].split(":");

      hoursMinSecs = {
        hours: 11 - Number(fulltime[0]),
        minutes: 59 - Number(fulltime[1]),
        seconds: 59 - Number(fulltime[2]),
      };

      showtimer = "flex";
    } else {
      showtimer = "none";
    }
  };

  const handleExtraInfo = (id) => {
    if (document.getElementById(id).style.display === "none") {
      document.getElementById(id).style.display = "flex";
      if (id === "shelflife") {
        setShelfLifeClicked(true);
      } else {
        setDescriptionsClicked(true);
      }
    } else {
      document.getElementById(id).style.display = "none";
      if (id === "shelflife") {
        setShelfLifeClicked(false);
      } else {
        setDescriptionsClicked(false);
      }
    }
  };

  return (
    <>
      {deliveryTimeCalculator()}
      {showTimer()}
      <div className={css.container} id="container">
        {/* <Alert type="success" message="Item added to Cart Successfully" /> */}

        <div className={css.left_rightContaiiner}>
          <div className={css.left}>
            <div className={css.sliderWrapper}>
              <Swiper
                Autoplay
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                className={css.swiperModel}
              >
                {product &&
                  product.images.map((image) => {
                    return (
                      <SwiperSlide className={css.slide}>
                        <img src={image.url} alt="" />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div className={css.imageSection}>
              <div className={css.subImages}>
                {product &&
                  product.images.map((image, index) => {
                    return (
                      <div
                        className={css.singleImage}
                        onClick={() => {
                          setFirst(image.url);
                        }}
                      >
                        <img
                          src={image.url}
                          alt=""
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "20% 10% 20% 15%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className={css.mainImage}>
                {/* {console.log(product)} */}
                <img
                  src={first}
                  alt=""
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
          <div className={css.right}>
            <div className={css.rightWrapper}>
              <div>
                <h1 className={css.title}>
                  <span>{name.name}</span>
                </h1>
              </div>
              <div className={css.col2}>
                <div className={css.topRating}>
                  <h2>
                    <span>{name.ratings} ⭐️</span>
                  </h2>
                </div>
                <span className={css.rating}>/ {name.numofreviews}</span>
                <div className={css.assured}>
                  <h2>
                    <span>(ratings)</span>
                  </h2>
                </div>
              </div>
              <div className={css.col3}>
                <div style={{}}>
                  <span className={css.price}>{price}</span>
                  <span className={css.realPrice}>/ kg</span>
                </div>
              </div>
              <div className={css.col4}>
                <div style={{}}>
                  <h4
                    style={{
                      fontSize: ".8rem",
                      fontWeight: "normal",
                      color: "blue",
                    }}
                  >
                    10-12 pieces per kg
                  </h4>
                </div>
                <h5
                  style={{
                    fontSize: ".7rem",
                    fontWeight: "normal",
                    color: "green",
                    // marginTop: ".2rem",
                  }}
                >
                  Order from ⭐️ AN Assured Shop And Get Hot [Boondi] Free.
                </h5>
              </div>

              <div className={css.dropdown}>
                <div className={css.mySelect}>
                  {sname === "" ? (
                    <a href="#shop">
                      <h2>Select Shop</h2>
                    </a>
                  ) : (
                    <a href="#shop">
                      <h2>{sname}</h2>
                    </a>
                  )}
                </div>
              </div>
              {/* <div>
                <CountDownTimer hoursMinSecs={hoursMinSecs} />
              </div> */}

              <div className={css.delivery_container}>
                <FaTruck className={css.delivery_icon} />
                <h2>
                  Expected Delivery By {deliverymonth1} {deliverByfirstvalue} -{" "}
                  {deliverymonth2} {deliverBysecondvalue}
                </h2>

                <div
                  style={{
                    marginLeft: ".5rem",
                    display: `${showtimer}`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  id="timer"
                >
                  <h3
                    style={{
                      fontSize: ".7rem",
                      marginRight: ".3rem",
                      color: "dodgerblue",
                    }}
                  >
                    If Ordered within
                  </h3>
                  <CountDownTimer hoursMinSecs={hoursMinSecs} />
                </div>
              </div>
              <h3 style={{ fontSize: ".9rem", fontWeight: 600 }}>
                Quantity [KG]
              </h3>
              <div className={css.quantity}>
                <div className={css.minus} onClick={handleMinus}>
                  <AiOutlineMinus
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                    onClick={handleMinus}
                  />
                </div>
                <div className={css.number}>
                  {/* <span>{quantity}</span> */}
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value));
                    }}
                    style={{
                      height: "100%",
                      width: "40%",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  />
                </div>
                <div className={css.plus} onClick={handlePlus}>
                  <AiOutlinePlus
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                    onClick={handlePlus}
                  />
                </div>
              </div>
              <div className={css.addtocart} onClick={addCartHandler}>
                <h4>Add to Cart</h4>
              </div>
              <div className={css.extrainfo}>
                <div
                  className={css.show}
                  onClick={() => handleExtraInfo("description")}
                >
                  <h4>Description</h4>
                  {descriptionClicked === false ? (
                    <AiOutlinePlus size={16} />
                  ) : (
                    <AiOutlineMinus size={16} />
                  )}
                </div>
                <div
                  style={{
                    // marginTop: "1rem",
                    display: "none",
                    // borderBottom: "1px solid #000",
                  }}
                  id="description"
                >
                  <p>{name.description}</p>
                </div>
              </div>

              <div className={css.extrainfo}>
                <div
                  className={css.show}
                  onClick={() => handleExtraInfo("shelflife")}
                >
                  <h4>Shelf Life</h4>
                  {shelflifeClicked === false ? (
                    <AiOutlinePlus size={16} />
                  ) : (
                    <AiOutlineMinus size={16} />
                  )}
                </div>
                <div
                  style={{
                    // marginTop: "1rem",
                    display: "none",
                    // borderBottom: "1px solid #000",
                  }}
                  id="shelflife"
                >
                  <h4>Enjoy our {name.name} before 5days of purchase</h4>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #000",
                    width: "100%",
                    height: 2,
                  }}
                ></div>
              </div>

              {/* <p>{name.description}</p> */}
            </div>
          </div>
        </div>
        <div className={css.selectShopContainer} id="shop">
          <h1>Select Shop</h1>

          <div className={css.shopsWrapper}>
            <div className={css.columns}>
              <h1 className={css.heading}>Select</h1>
              <h1 className={css.heading}>Shop</h1>
              <h1 className={css.heading}>Location</h1>
              <h1 className={css.heading}>Price</h1>
              <h1 className={css.heading}>Rating</h1>
              <h1 className={css.heading}>Reviews</h1>
              <h1 className={css.heading}>Assured</h1>
            </div>
            <div className={css.actualColumns}>
              {product &&
                product.shops.map((shop, i) => {
                  return (
                    <div className={css.singleShop}>
                      {/* <> */}
                      <div className={css.check}>
                        <input
                          type="checkbox"
                          className={css.checkbox}
                          // checked={(e)=>handleCheckboxChange(e, shop.price, shop.shopname, i)}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              shop.price,
                              shop.shopname,
                              i,
                              shop.assured
                            )
                          }
                          id={i}
                        />
                      </div>

                      <h1 className={css.heading}>{shop.shopname}</h1>
                      <h1 className={css.heading}>{shop.location}</h1>
                      <h1 className={css.heading}>{shop.price}/kg</h1>
                      <h1 className={css.heading}>{shop.rating} ⭐️</h1>
                      <h1 className={css.heading}>{shop.numberOfReviews}</h1>

                      {shop.assured === true ? (
                        <h1 className={css.heading} style={{ color: "green" }}>
                          true
                        </h1>
                      ) : (
                        <h1
                          className={css.heading}
                          style={{ color: "red", fontSize: "1rem" }}
                        >
                          false
                        </h1>
                      )}
                      {/* <h1 className={css.heading}>{shop.assured}</h1> */}
                      {/* </> */}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {/* <p>{name.description}</p> */}
        <FeaturedProducts items={10} name={name.name} />
      </div>
      <div className={css.animation} id="animation"></div>
    </>
  );
};

export default SingleProduct;
