import { expect } from "@std/expect";

import { normalizeString } from "../utils/data.ts";

Deno.test("normalizeString should return a string with no leading or trailing whitespace", () => {
  const actual = normalizeString("  hello  ");
  const expected = "hello";

  expect(actual).toEqual(expected);
});

Deno.test("normalizeString should return a string with all lowercase characters", () => {
  const actual = normalizeString("HeLLo");
  const expected = "hello";

  expect(actual).toEqual(expected);
});
