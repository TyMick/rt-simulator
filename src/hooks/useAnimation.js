import { useState, useEffect } from "react";

export default function useAnimation(
  animating,
  rt,
  dispatch,
  options = { timeAtEnds: 3000, timeWhileMoving: 50 }
) {
  const { timeAtEnds, timeWhileMoving } = options;
  
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    if (animating) {
      let timer;
      if (rt === 0.9 && direction === "down") {
        timer = setTimeout(() => {
          setDirection("up");
          dispatch({ type: "incrementRt" });
        }, timeAtEnds);
      } else if (rt === 1.1 && direction === "up") {
        timer = setTimeout(() => {
          setDirection("down");
          dispatch({ type: "decrementRt" });
        }, timeAtEnds);
      } else {
        timer = setTimeout(() => {
          dispatch({
            type: direction === "up" ? "incrementRt" : "decrementRt",
          });
        }, timeWhileMoving);
      }
      return () => clearTimeout(timer);
    } else {
      if (rt < 1.1) {
        setDirection("up");
      } else {
        setDirection("down");
      }
    }
  }, [animating, rt, dispatch, direction, timeAtEnds, timeWhileMoving]);
}
