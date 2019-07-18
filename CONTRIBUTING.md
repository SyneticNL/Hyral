# Contributing

## Code Style

This project follows [AirBnB coding standards]. ESLint will report any style violations when tests are run or 
with `npm run lint`

Some style violations can automatically be fixed by running `npm run fix`

## Tests

The project has extensive test coverage with Jest.

Run the test-suite a single time with `npm run test`. To watch and automatically execute on file change 
run `npm run test:watch`. 

All Pull Requests should have 100% test-covered. Run `npm run test:coverage` to see a report.

## Setup

1. Fork this repo

1. Clone your fork:

    ```bash
    git clone https://github.com/your-username/Hyral.git
    cd Hyral
    ```

1. Create a feature branch:

    ```bash
    git checkout -b your-feature-name
    ```

1. Install dependencies:

    ```bash
    npm install
    ```

1. Test changes

    ```
    npm run test
    ```

1. Commit changes:

    ```bash
    git commit -am 'feat: add feature name'
    ```

1. Push changes:

    ```bash
    git push origin your-feature-name
    ```

1. Open a pull request

[AirBnb coding standards]: https://github.com/airbnb/javascript