import { loadCbsCsv, loadSVnCsv, mergeData } from "../index.ts";
import { postgresClient } from "./client.ts";

// Populate the database with the data from the CSV files
// This file should be called only with the deno task
try {
  const SvnData = await loadSVnCsv("./src/data/datasheet.csv");
  const CbsData = await loadCbsCsv(
    "./src/data/woonplaatsen_nederland_2024.csv",
  );

  const mergedData = mergeData(SvnData, CbsData);

  // Empty the municipalities table before inserting new data
  await postgresClient`TRUNCATE municipalities`;

  // Insert the merged data into the municipalities table
  await postgresClient`
    INSERT INTO municipalities ${postgresClient(mergedData)}
    `;
} catch (error) {
  console.error("An error occurred:", error);
}
