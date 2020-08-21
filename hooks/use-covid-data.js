import { useEffect } from "react";
import useSWR from "swr";
import fetch from "unfetch";
import { fromCSV } from "data-forge";
import { isAfter, subDays, isEqual } from "date-fns";
import { round } from "lodash";

// Rt Live only requires attribution for data use: https://rt.live/faq#may-i-display-your-data-elsewhere-eg-my-site-publication-etc
const rtLiveDataUrl = "https://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv";

export default function useCovidData(dispatch, initialData, options) {
  const { data, error, isValidating } = useSWR(
    rtLiveDataUrl,
    fetchRtData,
    Object.assign(
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        errorRetryInterval: 0,
      },
      options
    )
  );

  useEffect(() => {
    if (dispatch && data) {
      dispatch({ type: "covidDataLoaded", payload: data });
    }
  }, [dispatch, data]);

  return {
    covidDataLoaded: data !== undefined,
    usaNewCases7DayAvg:
      data?.usaNewCases7DayAvg ?? initialData?.usaNewCases7DayAvg,
    stateData: data?.stateData ?? initialData?.stateData,
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
        reader.onload = function (event) {
          resolve(event.target.result);
        };
        reader.readAsText(csvBlob);
      });

      return await formatRtData(csvText);
    } else {
      let error = new Error(csvResponse.statusText);
      error.response = csvResponse;
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

async function formatRtData(csvString) {
  return new Promise((resolve, reject) => {
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
      .subset(["date", "region", "median", "lower_80", "upper_80", "new_cases"])
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
      const getField = (field) => {
        const value = lastDay
          .where((row) => row.region === region)
          .getSeries(field)
          .average();
        return round(value, 2);
      };
      return {
        median: getField("median"),
        lower_80: getField("lower_80"),
        upper_80: getField("upper_80"),
      };
    }

    const regions = lastWeek.getSeries("region").distinct().toArray();
    for (const region of regions) {
      data.stateData[region] = {
        newCases7DayAvg: getNewCases7DayAvg(region),
        rtEstimate: getRtEstimate(region),
      };
    }

    resolve(data);
  });
}
