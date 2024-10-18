import { normalizeString } from "../helpers/index.ts";
import type {
  MergeDataResult,
  MergedDataEntry,
  ParsedCbsDataEntry,
  ParsedSvnDataEntry,
} from "../types/index.ts";

/**
 * Merges SVN data entries with CBS data entries based on matching municipalities.
 *
 * @param svnData - An array of parsed SVN data entries.
 * @param cbsData - An array of parsed CBS data entries.
 * @returns An array of merged data entries.
 * @throws Will throw an error if either `svnData` or `cbsData` is empty.
 *
 * The function normalizes the municipality names from both datasets and merges
 * entries that have matching municipalities. If an SVN entry does not have a
 * corresponding CBS entry, it is added to the list of unmatched SVN entries.
 *
 * The function logs the number of successfully merged entries and warns about
 * any unmatched SVN entries.
 */
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
    const normalizedMunicipality = normalizeString(cbsEntry.municipality);
    cbsDataMap.set(normalizedMunicipality, cbsEntry);
  }

  for (const svnEntry of svnData) {
    const normalizedMunicipality = normalizeString(svnEntry.municipality);
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
      console.warn(`- ${entry.municipality}`);
    }
  }

  return mergedData;
};
