/**
 * Based on Rt Live's Python spread model: https://github.com/rtcovidlive/covid-model/blob/master/tutorial.ipynb
 */
import { jStat } from "jstat";
import { startOfToday, addDays } from "date-fns";

const meanSI = 4.7;
const stdSI = 2.9;
const muSI = Math.log(meanSI ** 2 / Math.sqrt(stdSI ** 2 + meanSI ** 2));
const sigmaSI = Math.sqrt(Math.log(stdSI ** 2 / meanSI ** 2 + 1));
const generationTime = jStat.lognormal(muSI, sigmaSI);

export function generateSimData(
  rtMedian,
  initialDailyInfections,
  medianColor,
  ciBreakpoints = [],
  options = {}
) {
  const { lengthInMonths = 4, startDate = startOfToday() } = options;
  const lengthInDays = 365.25 * (lengthInMonths / 12);

  let simData = [];
  let cumulativeInfections = 0;
  for (let t = 0; t < lengthInDays; t++) {
    let datum = { date: addDays(startDate, t) };
    if (medianColor) {
      datum.medianColor = medianColor;
    }

    function fillNewInfections(rt, fieldname) {
      let newInfections = 0;

      // Loop over previous days
      let remainingProbability = 1;
      for (let i = 1; i <= t; i++) {
        let probability = generationTime.pdf(i);
        newInfections += simData[t - i][fieldname] * rt * probability;
        remainingProbability -= probability;
      }

      // Apply remaining probability to initial daily infections value
      newInfections += initialDailyInfections * rt * remainingProbability;

      datum[fieldname] = newInfections;
      return newInfections;
    }

    cumulativeInfections += fillNewInfections(rtMedian, "medianNewInfections");
    for (let i = 0; i < ciBreakpoints.length; i++) {
      fillNewInfections(ciBreakpoints[i], `ciBreakpoint${i}`);
    }

    simData.push(datum);
  }

  return { simData, cumulativeInfections };
}
