# cypress-test
This is a sample project to test login to a web site and make some validations.

# How to build?
1. Clone the project - git clone https://github.com/thushan-godahewa/cypress-test.git
2. Install Cypress (using NPM) - npm install cypress --save-dev
3. Update the following files as required:
    - cypress.json : Update the target URL to point to environment
    - cypress/fixtures/testData.json : Enter the correct email and password
    - cypress/fixtures/expectedTestData.json : Update with expected data
4. Verify your Cypress installation - ./node_modules/.bin/cypress verify
    If successfully verified, you shoul get a "✔  Verified Cypress!" message
5. Open Cypress - ./node_modules/.bin/cypress open
6. Launch the filter_by_payment_id_and_validate_spec.js test using Cypress UI
