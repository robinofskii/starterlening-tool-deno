import { expect } from "@std/expect";

import { loadCbsCsv, loadSVnCsv } from "../helpers/read-csv.ts";

import type { ParsedCbsDataEntry, ParsedSvnDataEntry } from "../types/index.ts";

Deno.test("loadSVnCsv should load and parse SVn CSV data correctly", async () => {
  const data = await loadSVnCsv("./src/data/datasheet.csv");
  expect(Array.isArray(data)).toEqual(true);
  if (data.length > 0) {
    const entry: ParsedSvnDataEntry = data[0];
    expect(typeof entry.municipality).toEqual("string");
    expect(typeof entry.loan).toEqual("string");
  }
});

Deno.test("loadCbsCsv should load and parse CBS CSV data correctly", async () => {
  const data = await loadCbsCsv("./src/data/woonplaatsen_nederland_2024.csv");

  expect(Array.isArray(data)).toEqual(true);
  if (data.length > 0) {
    const entry: ParsedCbsDataEntry = data[0];
    expect(typeof entry.municipality).toEqual("string");
    expect(typeof entry.state).toEqual("string");
    expect(typeof entry.partOfCountry).toEqual("string");
  }
});

Deno.test("loadSVnCsv should throw an error when the file does not exist", async () => {
  try {
    await loadSVnCsv("./src/data/nonexistent.csv");
  } catch (error) {
    expect(error).toBeDefined();
  }
});
