type Props<T> = {
  data: T;
  filename: string;
};

/**
 * Writes the given data to a CSV file.
 *
 * @param data - An array of objects representing the data to write.
 * @param filename - The name of the file to write the data to.
 * @throws Will throw an error if the data is empty.
 */
export const writeDataToCsv = <T>({ data, filename }: Props<T>): void => {
  if (filename.length === 0) {
    throw new Error("No filename provided!");
  }

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array!");
  }

  if (data.length === 0) {
    throw new Error("No data to write!");
  }

  const header = Object.keys(data[0]).join(";");
  const rows = data.map((entry) => Object.values(entry).join(";")).join("\n");
  const csv = `${header}\n${rows}`;

  Deno.writeTextFileSync(filename, csv);

  console.log(`Data written to ${filename}`);
};
