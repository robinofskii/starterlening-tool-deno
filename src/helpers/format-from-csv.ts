import fs from "node:fs";
import { parse } from "npm:csv-parse";
import type { ParsedSvnData, SvnDataRow } from "../types/index.ts";

export const formatFromSvnCsv = (fileUrl: string): Promise<ParsedSvnData> => {
  const data: ParsedSvnData = [];

  const promise = new Promise<ParsedSvnData>((resolve, reject) => {
    console.log("Loading csv file");
    fs.createReadStream(fileUrl)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row: SvnDataRow) => {
        const [municipality, loan] = row;
        data.push({ municipality, loan });
      })
      .on("end", function () {
        console.log("Finished loading csv file");
        resolve(data);
      })
      .on("error", function (error) {
        console.error(error.message);
        reject(error);
      });
  });

  return promise;
};
