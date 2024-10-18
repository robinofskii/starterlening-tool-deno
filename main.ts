import { formatFromCbsCsv, formatFromSvnCsv } from "./src/helpers/index.ts";

const SvnData = await formatFromSvnCsv();
const CbsData = await formatFromCbsCsv();

// Merge the two datasets
const mergedData = SvnData.map((svnDataRow) => {
  const cbsDataRow = CbsData.find((cbsDataRow) =>
    cbsDataRow.municipality === svnDataRow.municipality
  );
  return { ...svnDataRow, ...cbsDataRow };
});

console.log(mergedData);
