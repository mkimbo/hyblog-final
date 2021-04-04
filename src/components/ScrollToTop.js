import React from "react";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
const ScrollToTop = () => {
  return (
    <ScrollUpButton
      style={{
        bottom: "75px",
        fill: "#1489cc",
        outline: "#1489cc",
        backgroundColor: "transparent",
      }}
      ShowAtPosition={500}
      AnimationDuration={200}
    ></ScrollUpButton>
  );
};

export default ScrollToTop;
