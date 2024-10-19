import {
  loadCbsCsv,
  loadSVnCsv,
  mergeData,
  writeDataToCsv,
} from "./src/helpers/index.ts";

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
