import { loadCbsCsv, loadSVnCsv, mergeData } from "./src/helpers/index.ts";

const SvnData = await loadSVnCsv();
const CbsData = await loadCbsCsv();

mergeData(SvnData, CbsData);