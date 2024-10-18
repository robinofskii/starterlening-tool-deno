import { formatFromCsv } from "./src/helpers/index.ts";

formatFromCsv("./src/data/datasheet.csv").then((data) => {
  console.log(data);
});
