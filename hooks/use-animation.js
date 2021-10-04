import { useState, useLayoutEffect, useRef, useMemo } from "react";

export default function useAnimation(
  animating,
  rt,
  dispatch,
  options = { timeAtEnds: 3000, timeWhileMoving: 50 }
) {
  const { timeAtEnds, timeWhileMoving } = options;

  const [direction, setDirection] = useState("up");

  const performanceStart = useRef(null);
  const expectedTravelTime = useMemo(
    () => Math.round(options.timeWhileMoving * ((1.1 - 0.9) / 0.01)),
    [options.timeWhileMoving]
  );

  useLayoutEffect(() => {
    if (animating) {
      let timer;
      if (rt === 0.9 && direction === "down") {
        if (performanceStart.current) {
          const animationTime = performance.now() - performanceStart.current;
          console.log(
            `Took ${animationTime} ms to move from 1.1 to 0.9 (expected ${expectedTravelTime})`
          );
        }

        timer = setTimeout(() => {
          performanceStart.current = performance.now();

          setDirection("up");
          dispatch({ type: "incrementRt" });
        }, timeAtEnds);
      } else if (rt === 1.1 && direction === "up") {
        if (performanceStart.current) {
          const animationTime = performance.now() - performanceStart.current;
          console.log(
            `Took ${animationTime} ms to move from 0.9 to 1.1 (expected ${expectedTravelTime})`
          );
        }

        timer = setTimeout(() => {
          performanceStart.current = performance.now();

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
      performanceStart.current = null;
      if (rt < 1.1) {
        setDirection("up");
      } else {
        setDirection("down");
      }
    }
  }, [
    animating,
    direction,
    dispatch,
    expectedTravelTime,
    rt,
    timeAtEnds,
    timeWhileMoving,
  ]);
}
