import fs from "node:fs";
import { parse } from "npm:csv-parse";
import type { CbsDataRow, ParsedSvnData, SvnDataRow,ParsedCbsData } from "../types/index.ts";

export const formatFromSvnCsv = (): Promise<ParsedSvnData> => {
  const data: ParsedSvnData = [];

  const promise = new Promise<ParsedSvnData>((resolve, reject) => {
    console.log("Loading SVn data");
    fs.createReadStream("./src/data/datasheet.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row: SvnDataRow) => {
        const [municipality, loan] = row;
        data.push({ municipality, loan });
      })
      .on("end", function () {
        console.log("Finished loading SVn data");
        resolve(data);
      })
      .on("error", function (error) {
        console.error(error.message);
        reject(error);
      });
  });

  return promise;
};

export const formatFromCbsCsv = (): Promise<ParsedCbsData> => {
  const data: ParsedCbsData = [];

  const promise = new Promise<ParsedCbsData>((resolve, reject) => {
    console.log("Loading CBS data");
    fs.createReadStream("./src/data/woonplaatsen_nederland_2024.csv")
      .pipe(parse({ delimiter: ";", from_line: 2, relax_quotes: true }))
      .on("data", (row: CbsDataRow) => {
        data.push({ municipality: row[3].trim(), state: row[5].trim(), partOfCountry: row[7].trim() });
      })
      .on("end", function () {
        console.log("Finished loading CBS data");
        resolve(data);
      })
      .on("error", function (error) {
        console.error(error.message);
        reject(error);
      });
  });

  return promise;
};