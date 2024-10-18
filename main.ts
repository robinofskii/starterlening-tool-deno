import { loadCbsCsv, loadSVnCsv, mergeData } from "./src/helpers/index.ts";

try {
  const SvnData = await loadSVnCsv();
  const CbsData = await loadCbsCsv();

  mergeData(SvnData, CbsData);
} catch (error) {
  console.error("An error occurred:", error);
}
