import useSWR from "swr";
import fetch from "unfetch";
import { fromCSV } from "data-forge";
import { isAfter, subDays, isEqual } from "date-fns";
import { round } from "lodash";

export default function useCovidData() {
  const {
    data,
    error,
    isValidating,
  } = useSWR(
    "https://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv",
    fetchRtData,
    { revalidateOnFocus: false }
  );

  return {
    covidDataLoaded: data !== undefined,
    usaNewCases7DayAvg: data?.usaNewCases7DayAvg,
    stateData: data?.stateData,
    error,
    isValidating,
  };
}

async function fetchRtData(csvUrl) {
  try {
    const csvResponse = await fetch(csvUrl, { method: "GET" });
    if (csvResponse.ok) {
      const csvBlob = await csvResponse.blob();
      const csvText = await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function (e) {
          resolve(e.target.result);
        };
        reader.readAsText(csvBlob);
      });

      return formatRtData(csvText);
    } else {
      let error = new Error(csvResponse.statusText);
      error.response = csvResponse;
      throw error;
    }
  } catch (e) {
    throw e;
  }
}

function formatRtData(csvString) {
  const fullData = fromCSV(csvString)
    .parseDates("date")
    .parseInts([
      "index",
      "positive",
      "tests",
      "new_tests",
      "new_cases",
      "new_deaths",
    ])
    .parseFloats([
      "mean",
      "median",
      "lower_80",
      "upper_80",
      "infections",
      "test_adjusted_positive",
      "test_adjusted_positive_raw",
    ])
    .bake();
  const subset = fullData
    .subset(["date", "region", "mean", "new_cases"])
    .bake();

  const latestDate = new Date(fullData.getSeries("date").max());
  const lastWeek = subset
    .where((row) => isAfter(new Date(row.date), subDays(latestDate, 7)))
    .bake();
  const lastDay = subset
    .where((row) => isEqual(new Date(row.date), latestDate))
    .bake();

  let data = { usaNewCases7DayAvg: getNewCases7DayAvg(), stateData: {} };

  function getNewCases7DayAvg(region) {
    let filtered;
    if (region) {
      filtered = lastWeek.where((row) => row.region === region).bake();
    } else {
      filtered = lastWeek.bake();
    }
    const avg = filtered.getSeries("new_cases").sum() / 7;
    return round(avg);
  }
  function getRtEstimate(region) {
    const estimate = lastDay
      .where((row) => row.region === region)
      .getSeries("mean")
      .average();
    return round(estimate, 2);
  }

  const regions = lastWeek.getSeries("region").distinct().toArray();
  for (const region of regions) {
    data.stateData[region] = {
      newCases7DayAvg: getNewCases7DayAvg(region),
      rtEstimate: getRtEstimate(region),
    };
  }

  return data;
}
