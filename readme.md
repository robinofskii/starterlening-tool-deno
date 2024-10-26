# Starterslening Tool

- [Starterslening Tool](#starterslening-tool)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
    - [Project Details](#project-details)
    - [Testing](#testing)
    - [Code Coverage](#code-coverage)
  - [License](#license)

This project uses public data to create a list of all municipalities in the
Netherlands that provide "Startersleningen" (starter loans). There is some
ambition to add functionality that plots this information on a map, allow users
to search for municipalities that provide loans within their provided search
area and export the list of municipalities to popular housing sites.

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed on your machine.
- [PostgreSQL](https://www.postgresql.org/) installed on your machine.

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

3. Set .env variables

   Create a `.env` file in the root directory of the project and add the
   following variables (replace the values with your own):

   ```sh
   # .env
   DB_DATABASE="starterslening-tool"
   DB_HOSTNAME="localhost"
   DB_PORT="5432"
   DB_USER="denoapp"
   DB_PASSWORD="123456"
   ```

### Running the Project

To run the project, use the Deno Tasks. The following tasks are available:

- `db:populate`: Populate the database with data from the CSV files.
- `db:geo`: Get geolocation data for each municipality in the database.
- `dev`: Run the project in development mode. (Currently only prints hello world)

### Project Details

- The project reads data from multiple CSV files located at
  [`src/data/datasheet.csv`](src/data/datasheet.csv) and
  [`src/data/woonplaatsen_nederland_2024.csv`](src/data/woonplaatsen_nederland_2024.csv).
- This information can be parsed and stored in a PostgreSQL database. With the Deno tasks, you can run the following command to seed the database from the CSV files:
  ```sh
  deno task db:populate
  ```
- With this data in the database, you can look up geolocation data for each
  municipality using the following command:
  ```sh
  deno task db:geo
  ```
  Give it some time to run, it has to make a lot of requests to [Nominatim](
  https://nominatim.org/
  ). And I have deliberately added a delay between requests to not overload the server.

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

Code coverage reports are generated in the `coverage/` directory. Each JSON file
in this directory represents the coverage data for a specific script. The
command above will also generate a `html` file for easier viewing of coverage.

## License

This project is licensed under the MIT License.
