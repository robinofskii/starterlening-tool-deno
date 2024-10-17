import fs from "node:fs";
import { parse } from "npm:csv-parse";
import { ParsedCSV } from "../types/index.ts";

export const formatFromCsv = (fileUrl: string): Promise<ParsedCSV> => {
  let data: ParsedCSV = [];

  const promise = new Promise<ParsedCSV>((resolve, reject) => {
    console.log("Loading csv file");
    fs.createReadStream(fileUrl)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        data = [...data, { municipality: row[0], loan: row[1] }];
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
