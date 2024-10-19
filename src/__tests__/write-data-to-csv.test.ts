import { expect } from "@std/expect";
import { writeDataToCsv } from "../helpers/write-data-to-csv.ts";
import type { MergeDataResult } from "../types/index.ts";

const data: MergeDataResult = [
  {
    municipality: "Amsterdam",
    state: "Noord-Holland",
    partOfCountry: "North",
    loan: "yes",
  },
];

const filename = "./test.csv";

Deno.test("writeDataToCsv writes data to a CSV file", () => {
  writeDataToCsv({ data, filename });

  const file = Deno.readTextFileSync(filename);
  const expected =
    "municipality;state;partOfCountry;loan\nAmsterdam;Noord-Holland;North;yes";

  expect(file).toEqual(expected);

  // Clean up
  Deno.removeSync(filename);
});

Deno.test("writeDataToCsv throws an error if array is empty", () => {
  const emptyData: MergeDataResult = [];

  expect(() => writeDataToCsv({ data: emptyData, filename })).toThrow(
    "No data to write!",
  );
});

Deno.test("writeDataToCsv throws an error if filename is empty", () => {
  const emptyFilename = "";

  expect(() => writeDataToCsv({ data, filename: emptyFilename })).toThrow(
    "No filename provided!",
  );
});

Deno.test("writeDataToCsv throws an error if data is not an array", () => {
  const invalidData = "invalid data";

  expect(() => writeDataToCsv({ data: invalidData, filename })).toThrow(
    "Data is not an array!",
  );
});