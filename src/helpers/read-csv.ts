import { parse, type ParseOptions } from "@std/csv";

export interface ParsedSvnDataEntry {
    municipality: string;
    loan: string;
}

export interface ParsedCbsDataEntry {
    municipality: string;
    state: string;
    partOfCountry: string;
}

async function loadCsvFile<T>(
    filePath: string,
    parseOptions: ParseOptions,
    mapRow: (row: Record<string, string>) => T
): Promise<T[]> {
    try {
        const fileContent = await Deno.readTextFile(filePath);
        const rawData = parse(fileContent, parseOptions) as Array<Record<string, string>>;
        return rawData.map(mapRow);
    } catch (error) {
        console.error(`Error loading data from '${filePath}':`, error);
        throw error;
    }
}

export const loadSVnCsv = async (): Promise<ParsedSvnDataEntry[]> => {
    const dataUrl = "./src/data/datasheet.csv";

    console.log(`Loading SVn data from ${dataUrl}`);

    const data =  await loadCsvFile(
        dataUrl,
        {
            skipFirstRow: true,
            columns: ["municipality", "loan"],
            trimLeadingSpace: true,
            lazyQuotes: true,
        },
        (row) => ({
            municipality: row.municipality.trim(),
            loan: row.loan.trim(),
        })
    );

    console.log(`Finished loading ${data.length} entries from SVn data`);

    return data;
};

export const loadCbsCsv = async (): Promise<ParsedCbsDataEntry[]> => {
    const dataUrl = "./src/data/woonplaatsen_nederland_2024.csv";

    console.log(`Loading CBS data from ${dataUrl}`);

    const data =  await loadCsvFile(
        "./src/data/woonplaatsen_nederland_2024.csv",
        {
            skipFirstRow: true,
            columns: [
                "ID",
                "Woonplaatsen",
                "Woonplaatscode_1",
                "Naam_2",
                "Code_3",
                "Naam_4",
                "Code_5",
                "Naam_6",
                "Code_7",
            ],
            separator: ";",
            trimLeadingSpace: true,
            lazyQuotes: true,
        },
        (row) => ({
            municipality: row.Naam_2.trim(),
            state: row.Naam_4.trim(),
            partOfCountry: row.Naam_6.trim(),
        })
    );

    console.log(`Finished loading ${data.length} entries from CBS data`);

    return data;
};
