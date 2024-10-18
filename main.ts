import { formatFromSvnCsv } from "./src/helpers/index.ts";

formatFromSvnCsv("./src/data/datasheet.csv").then((data) => {
  console.log(data);
});
