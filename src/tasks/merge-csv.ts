import {
  loadCbsCsv,
  loadSVnCsv,
  mergeData,
  writeDataToCsv,
} from "../utils/index.ts";

//! This script merges data from two CSV files and writes the result to a new CSV file.
//! The merged data contains entries from both files that have matching municipalities.
//! Do not use this script from anywhere other than the deno tasks.
try {
  const SvnData = await loadSVnCsv("./src/data/datasheet.csv");
  const CbsData = await loadCbsCsv(
    "./src/data/woonplaatsen_nederland_2024.csv",
  );

  const mergedData = mergeData(SvnData, CbsData);

  writeDataToCsv({
    data: mergedData,
    filename: "./src/data/merged-data.csv",
  });
} catch (error) {
  console.error("An error occurred:", error);
}
