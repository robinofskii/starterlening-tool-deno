import { expect } from "@std/expect";

import { mergeData } from "../helpers/merge-data.ts";
import type { MergeDataResult, ParsedCbsDataEntry, ParsedSvnDataEntry } from "../types/index.ts";

Deno.test("mergeData should merge two objects correctly", () => {
  const obj1: ParsedSvnDataEntry[] = [{
    municipality: "Amsterdam",
    loan: "Starterslening",
  }]
  const obj2: ParsedCbsDataEntry[] = [{
    municipality: "Amsterdam",
    state: "Noord-Holland",
    partOfCountry: "Nederland",
  }];

  const merged = mergeData(obj1, obj2);
  const expected = [{
    municipality: "Amsterdam",
    loan: "Starterslening",
    state: "Noord-Holland",
    partOfCountry: "Nederland",
  }];
  
  expect(merged).toEqual(expected);
});

Deno.test("mergeData should handle empty objects", () => {
  const obj1:ParsedSvnDataEntry[] = [];
  const obj2: ParsedCbsDataEntry[] = [];

  expect(() => mergeData(obj1, obj2)).toThrow();
});

Deno.test("mergeData should handle unmatched entries", () => {
  const obj1: ParsedSvnDataEntry[] = [{
    municipality: "Amsterdam",
    loan: "Starterslening",
  }];
  const obj2: ParsedCbsDataEntry[] = [{
    municipality: "Rotterdam",
    state: "Zuid-Holland",
    partOfCountry: "Nederland",
  }];

  const merged = mergeData(obj1, obj2);
  const expected: MergeDataResult = [];

  expect(merged).toEqual(expected);
});