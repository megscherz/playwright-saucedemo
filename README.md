Playwright Test Suite — Sauce Demo
A personal test automation project built with Playwright and TypeScript, testing critical user workflows on Sauce Demo — a practice e-commerce application.
About This Project
This project was built to demonstrate end-to-end test automation skills using Playwright, TypeScript, and the Page Object Model design pattern. It covers core user journeys including authentication, shopping cart management, checkout, and product sorting.
Tech Stack

Playwright
TypeScript
Node.js
Page Object Model (POM) pattern

Test Coverage
Test SuiteWhat's CoveredLoginValid login, invalid credentials, locked out userShopping CartAdd items, remove items, verify cart countCheckoutEnd-to-end purchase flow, form validationSortingSort by price (low/high), sort by name (A-Z, Z-A)
Project Structure
├── tests/          # Test specs
├── pages/          # Page Object Models
├── playwright.config.ts
└── README.md
How To Run
bash# Install dependencies
npm install

# Run all tests
npx playwright test

# Run tests with UI mode
npx playwright test --ui

# View test report
npx playwright show-report
