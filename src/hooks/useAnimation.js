import { useState, useEffect } from "react";
import { round } from "lodash";

export default function useAnimation(
  rt,
  setRt,
  setRegion,
  { animateAtStart = true, timeAtEnds = 3000, timeWhileMoving = 50 }
) {
  const [animating, setAnimating] = useState(animateAtStart);
  const [animationDirection, setAnimationDirection] = useState("up");
  useEffect(() => {
    if (animating) {
      let timer;
      if (rt === 0.9 && animationDirection === "down") {
        timer = setTimeout(() => {
          setAnimationDirection("up");
          setRt(0.91);
        }, timeAtEnds);
      } else if (rt === 1.1 && animationDirection === "up") {
        timer = setTimeout(() => {
          setAnimationDirection("down");
          setRt(1.09);
        }, timeAtEnds);
      } else {
        const nextRt = round(
          animationDirection === "up" ? rt + 0.01 : rt - 0.01,
          2
        );
        timer = setTimeout(() => {
          setRt(nextRt);
        }, timeWhileMoving);
      }
      return () => clearTimeout(timer);
    }
  }, [rt, setRt, animating, animationDirection, timeAtEnds, timeWhileMoving]);

  function toggleAnimation() {
    if (!animating) {
      setRegion("");
      if (rt < 1.1) {
        setAnimationDirection("up");
      } else {
        setAnimationDirection("down");
      }
    }
    setAnimating(!animating);
  }

  return { animating, setAnimating, toggleAnimation };
}
