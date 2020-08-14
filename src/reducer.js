import { createContext } from "react";
import { round } from "lodash";

export const initialState = {
  rt: 1.1,
  animating: true,
  initialDailyInfections: 10000,
  userChangedIDI: false,
  region: "",
  stateData: undefined,
};

export function reducer(state, { type, payload }) {
  let {
    rt,
    animating,
    initialDailyInfections,
    userChangedIDI,
    region,
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
      if (animating) {
        animating = false;
      } else {
        animating = true;
        region = "";
      }
      break;

    case "covidDataLoaded":
      const { usaNewCases7DayAvg, stateData: stateDataFromPayload } = payload;
      stateData = stateDataFromPayload;
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
    stateData,
  };
}

export const DispatchContext = createContext(null);
