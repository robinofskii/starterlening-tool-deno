export interface ParsedSvnDataEntry {
    municipality: string;
    loan: string;
}

export interface ParsedCbsDataEntry {
    municipality: string;
    state: string;
    partOfCountry: string;
}

export type MergedDataEntry = ParsedSvnDataEntry & ParsedCbsDataEntry;

export type MergeDataResult = MergedDataEntry[];