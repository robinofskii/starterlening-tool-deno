import { loadCbsCsv, loadSVnCsv, mergeData } from "./src/helpers/index.ts";

try {
  const SvnData = await loadSVnCsv("./src/data/datasheet.csv");
  const CbsData = await loadCbsCsv("./src/data/woonplaatsen_nederland_2024.csv");

  mergeData(SvnData, CbsData);
} catch (error) {
  console.error("An error occurred:", error);
}
