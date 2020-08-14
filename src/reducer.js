import { createContext } from "react";
import { round } from "lodash";

export const initialState = {
  rt: 1.1,
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
      break;

    case "incrementRt":
      rt = round(rt + 0.01, 2);
      break;

    case "decrementRt":
      rt = round(rt - 0.01, 2);
      break;

    case "toggleAnimation":
      animating = !animating;
      region = "";
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
      break;

    case "resetInitialDailyInfections":
      initialDailyInfections = usaNewCases7DayAvg;
      userChangedIDI = true;
      region = "";
      break;

    case "setRegion":
      region = payload;
      if (payload !== "") {
        rt = stateData[region].rtEstimate;
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
    animating,
    initialDailyInfections,
    userChangedIDI,
    region,
    usaNewCases7DayAvg,
    stateData,
  };
}

export const DispatchContext = createContext(null);
