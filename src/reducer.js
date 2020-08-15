import { createContext } from "react";
import { round } from "lodash";

export const initialState = {
  rt: 1.1,
  rtLower80: undefined,
  rtUpper80: undefined,
  animating: true,
  initialDailyInfections: 10000,
  userChangedIDI: false,
  region: "",
  usaNewCases7DayAvg: undefined,
  stateData: undefined,
};

export function reducer(state, { type, payload }) {
  let {
    rt,
    rtLower80,
    rtUpper80,
    animating,
    initialDailyInfections,
    userChangedIDI,
    region,
    usaNewCases7DayAvg,
    stateData,
  } = state;

  switch (type) {
    case "setRt":
      rt = payload;
      animating = false;
      region = "";
      rtLower80 = undefined;
      rtUpper80 = undefined;
      break;

    case "incrementRt":
      rt = round(rt + 0.01, 2);
      break;

    case "decrementRt":
      rt = round(rt - 0.01, 2);
      break;

    case "toggleAnimation":
      if (animating) {
        animating = false;
      } else {
        animating = true;
        region = "";
        rtLower80 = undefined;
        rtUpper80 = undefined;
      }
      break;

    case "covidDataLoaded":
      usaNewCases7DayAvg = payload.usaNewCases7DayAvg;
      stateData = payload.stateData;
      // Don't suddenly fill in the current US average after the user has
      // already changed the initial daily infections number:
      if (!userChangedIDI) {
        initialDailyInfections = usaNewCases7DayAvg;
      }
      break;

    case "setInitialDailyInfections":
      initialDailyInfections = payload;
      userChangedIDI = true;
      region = "";
      rtLower80 = undefined;
      rtUpper80 = undefined;
      break;

    case "resetInitialDailyInfections":
      initialDailyInfections = usaNewCases7DayAvg;
      userChangedIDI = true;
      region = "";
      rtLower80 = undefined;
      rtUpper80 = undefined;
      break;

    case "setRegion":
      region = payload;
      if (payload === "") {
        rtLower80 = undefined;
        rtUpper80 = undefined;
      } else {
        rt = stateData[region].rtEstimate.median;
        rtLower80 = stateData[region].rtEstimate.lower_80;
        rtUpper80 = stateData[region].rtEstimate.upper_80;
        animating = false;
        initialDailyInfections = stateData[region].newCases7DayAvg;
        userChangedIDI = true;
      }
      break;

    default:
      throw new Error(
        `Your reducer doesn't have a handler for action.type "${type}"`
      );
  }

  return {
    rt,
    rtLower80,
    rtUpper80,
    animating,
    initialDailyInfections,
    userChangedIDI,
    region,
    usaNewCases7DayAvg,
    stateData,
  };
}

export const DispatchContext = createContext(null);
