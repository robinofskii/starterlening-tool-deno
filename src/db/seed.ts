import { loadSVnCsv } from "../utils/index.ts";
import { postgresClient } from "./client.ts";

try {
  const SvnData = await loadSVnCsv("./src/data/datasheet.csv");

  // Empty the municipalities table before inserting new data
  await postgresClient`TRUNCATE municipalities`;

  // Insert the merged data into the municipalities table
  await postgresClient`
    INSERT INTO municipalities ${postgresClient(SvnData)}
    `;
} catch (error) {
  console.error("An error occurred:", error);
}
