import React from "react";
import Lottie from "lottie-react";

export default function LottiePlayer({ animationData, style = { height: 200 } }) {
  if (!animationData) return null;
  return (
    <div className="mx-auto">
      <Lottie animationData={animationData} loop autoplay style={style} />
    </div>
  );
}
