

# Starterslening Tool

This project uses public data to create a list of all municipalities in the Netherlands that provide "Startersleningen" (starter loans).

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed on your machine.

### Installation

1. Clone the repository:
    ```sh
    
    git clone https://github.com/robinofskii/starterlening-tool-deno.git
    cd starterslening-tool-deno

    ```

2. Install dependencies:
    ```sh

    deno cache main.ts

    ```

### Running the Project

To run the project, execute the following command:

```sh

deno run dev

```

### Project Details

- The project reads data from a CSV file located at [`src/data/datasheet.csv`](src/data/datasheet.csv).
- It uses the `loadCsvFile` function from [`src/helpers/read-csv.ts`](src/helpers/read-csv.ts) to load and parse the CSV data.
- The parsed data is then processed to generate a list of municipalities that provide "Startersleningen".

### Testing

To run the tests, use the following command:

```sh

deno run test

```

To run the tests with coverage, use the following command:

```sh

deno run test:coverage

```

### Code Coverage

Code coverage reports are generated in the `coverage/` directory. Each JSON file in this directory represents the coverage data for a specific script.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
