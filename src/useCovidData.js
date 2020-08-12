import useSWR from "swr";
import fetch from "unfetch";
import { fromCSV } from "data-forge";
import { isAfter, subDays } from "date-fns";

export default function useCovidData(region) {
  const { data, error } = useSWR(
    "https://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv",
    fetchRtData
  );

  let response = {
    dataLoaded: data !== undefined,
    error,
  };
  if (region) {
    response.newCases7DayAvg = data[region].newCases7DayAvg;
    if (region !== "USA") {
      response.rtEstimate = data[region].rtEstimate;
    }
  }
  return response;
}

async function fetchRtData(csvUrl) {
  try {
    const csvResponse = await fetch(csvUrl, { method: "GET" });
    if (csvResponse.ok) {
      const csvBlob = csvResponse.blob();
      const csvText = await new Promise((resolve, reject) => {
        try {
          let reader = new FileReader();
          reader.onload = function (e) {
            resolve(e.target.result);
          };
          reader.readAsText(csvBlob);
        } catch (e) {
          reject(e);
        }
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
    ]);
  const subset = fullData.subset(["date", "region", "mean", "new_cases"]);

  const latestDate = new Date(fullData.getSeries("date").max());
  const lastWeek = subset.where((row) =>
    isAfter(new Date(row.date), subDays(latestDate, 7))
  );
  const lastDay = subset.where((row) =>
    dateFns.isEqual(new Date(row.date), latestDate)
  );

  let data = {
    USA: { newCases7DayAvg: lastWeek.getSeries("new_cases").sum() / 7 },
  };

  const getNewCases7DayAvg = (region) =>
    lastWeek
      .where((row) => row.region === region)
      .getSeries("new_cases")
      .sum() / 7;
  const getRtEstimate = (region) =>
    lastDay
      .where((row) => row.region === region)
      .getSeries("mean")
      .average();

  const regions = lastWeek.getSeries("region").distinct().toArray();
  for (const region of regions) {
    data[region] = {
      newCases7DayAvg: getNewCases7DayAvg(region),
      rtEstimate: getRtEstimate(region),
    };
  }

  return data;
}
