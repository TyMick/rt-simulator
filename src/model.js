// JavaScript port of Rt Live's Python spread model: https://github.com/rtcovidlive/covid-model/blob/master/tutorial.ipynb
// Also formats time axis as dates instead of integer days

import { jStat } from "jstat";
import { startOfToday, addDays } from "date-fns";

const meanSI = 4.7;
const stdSI = 2.9;
const muSI = Math.log(meanSI ** 2 / Math.sqrt(stdSI ** 2 + meanSI ** 2));
const sigmaSI = Math.sqrt(Math.log(stdSI ** 2 / meanSI ** 2 + 1));
const generationTime = jStat.lognormal(muSI, sigmaSI);

export function generateSimData(
  rt,
  initialDailyInfections,
  lengthInMonths = 4,
  startDate = startOfToday()
) {
  const lengthInDays = 365.25 * (lengthInMonths / 12);

  let data = [];
  for (let t = 0; t < lengthInDays; t++) {
    let newInfections = 0;

    // Loop over previous days
    let remainingProbability = 1;
    for (let i = 1; i <= t; i++) {
      let probability = generationTime.pdf(i);
      newInfections += data[t - i].newInfections * rt * probability;
      remainingProbability -= probability;
    }

    // Apply remaining probability to initial daily infections value
    newInfections += initialDailyInfections * rt * remainingProbability;

    data.push({ date: addDays(startDate, t), newInfections });
  }

  return data;
}