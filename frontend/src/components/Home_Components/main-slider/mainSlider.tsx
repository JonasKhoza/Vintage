import { useState, useEffect, useRef } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import classes from "../styles/mainSlider.module.css";
// const colors = ["#0088FE", "#00C49F", "#FFBB28", "red", "blue"];

const slides = [
  {
    content: (
      <div className={classes.heroImage}>
        <div className={classes.heroText}></div>
      </div>
    ),
    backgroundColor: "#0088FE",
    backgroundImage:
      "url('https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707350400&semt=ais')",
  },
  {
    content: (
      <div className={classes.heroImage}>
        <div className={classes.heroText}></div>
      </div>
    ),
    backgroundColor: "#00C49F",
    backgroundImage:
      "url('https://www.shutterstock.com/image-photo/flat-lay-shot-gadgets-mobile-260nw-1839621517.jpg')",
  },
  {
    content: (
      <div className={classes.heroImage}>
        <div className={classes.heroText}></div>
      </div>
    ),
    backgroundColor: "#FFBB28",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1621319332247-ce870cdad56c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhZGdldHxlbnwwfHwwfHx8MA%3D%3D')",
  },
  {
    content: (
      <div className={classes.heroImage}>
        <div className={classes.heroText}></div>
      </div>
    ),
    backgroundColor: "red",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neSUyMHByb2R1Y3RzfGVufDB8fDB8fHww')",
  },
  {
    content: (
      <div className={classes.heroImage}>
        <div className={classes.heroText}></div>
      </div>
    ),
    backgroundColor: "orange",
    backgroundImage:
      "url('https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707350400&semt=ais')",
  },
  {
    content: (
      <div className={classes.heroImage}>
        <div className={classes.heroText}></div>
      </div>
    ),
    backgroundColor: "purple",
    backgroundImage: `url("https://www.shutterstock.com/image-vector/electronics-promotional-shopping-sale-computer-260nw-1190458762.jpg")`,
  },
  // Add more slides as needed
];

function MainSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); //The setTimeout function returns a NodeJS.Timeout type, which extends the number type.

  const delay = 4000;
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function prevSlider() {
    if (index > 0) {
      setIndex((prevV) => {
        return prevV - 1;
      });
    }
    return;
  }

  function nextSlider() {
    if (index !== slides.length - 1) {
      setIndex((prevV) => {
        return prevV + 1;
      });
    }
    return;
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className={classes.slideshow}>
      <div
        className={classes.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slides.map((slide, idx) => (
          <div
            className={classes.slide}
            key={idx}
            style={{
              backgroundImage: `${slide.backgroundImage}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
            }}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/*SLIDESHOW DOTS */}
      <div className={classes.navigation_container}>
        <NavigateBeforeIcon
          className={`${classes.prev_next} ${
            index === 0 ? classes.disable : ""
          }`}
          onClick={prevSlider}
        />
        <div className={classes.slideshowDots}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`${classes.slideshowDot} ${
                index === idx ? classes.active : ""
              }`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
        <NavigateNextIcon
          className={`${classes.prev_next} ${
            index === slides.length - 1 ? classes.disable : ""
          }`}
          onClick={nextSlider}
        />
      </div>
    </div>
  );
}

export default MainSlider;
