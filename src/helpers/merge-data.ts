import type {
  ParsedCbsDataEntry,
  ParsedSvnDataEntry,
} from "../helpers/index.ts";

export type MergedDataEntry = ParsedSvnDataEntry & ParsedCbsDataEntry;

export type MergeDataResult = MergedDataEntry[];


function normalizeMunicipality(name: string): string {
  return name.trim().toLowerCase();
}

export const mergeData = (
  svnData: ParsedSvnDataEntry[],
  cbsData: ParsedCbsDataEntry[],
): MergeDataResult => {
  const mergedData: MergedDataEntry[] = [];
  const unmatchedSvnEntries: ParsedSvnDataEntry[] = [];

  // Check if the arrays are empty
  if (svnData.length === 0 || cbsData.length === 0) {
    throw new Error("No data to merge!");
  }

  console.log("Merging data...");

  const cbsDataMap = new Map<string, ParsedCbsDataEntry>();
  for (const cbsEntry of cbsData) {
    const normalizedMunicipality = normalizeMunicipality(cbsEntry.municipality);
    cbsDataMap.set(normalizedMunicipality, cbsEntry);
  }

  for (const svnEntry of svnData) {
    const normalizedMunicipality = normalizeMunicipality(svnEntry.municipality);
    const cbsEntry = cbsDataMap.get(normalizedMunicipality);

    if (cbsEntry) {
      mergedData.push({ ...cbsEntry, ...svnEntry });
    } else {
      unmatchedSvnEntries.push(svnEntry);
    }
  }

  console.log(`Merged ${mergedData.length} entries successfully`);

  // Report unmatched entries
  if (unmatchedSvnEntries.length > 0) {
    console.warn(
      `Found ${unmatchedSvnEntries.length} SVN entries without a matching CBS entry:`,
    );
    for (const entry of unmatchedSvnEntries) {
      console.warn(`- Municipality: ${entry.municipality}`);
    }
  }

  return mergedData

};