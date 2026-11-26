# Playwright Web Automation Testing

## Project Overview

This project is a Web Automation Testing portfolio developed using Playwright and TypeScript.

The testing activities focus on validating the functionality of the SauceDemo e-commerce web application, covering authentication, product management, shopping cart, and checkout processes.

## Application Under Test

- Website: https://www.saucedemo.com/
- Application Type: E-commerce Web Application
- Testing Type: Functional Testing
- Automation Framework: Playwright

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Visual Studio Code
- Git & GitHub

## Project Structure

```text
playwright-saucedemo/
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data/
│   └── users.json
├── playwright.config.ts
└── README.md
```

## Test Coverage

| Module | Test Scenarios |
|---|---|
| Login | Valid login, invalid login, locked user, empty credentials |
| Products | Product visibility, product count, product information, add/remove products |
| Shopping Cart | Cart visibility, product validation, remove product, continue shopping |
| Checkout | Checkout page validation, valid information, empty required fields |

## Framework Design

This project implements the Page Object Model (POM) design pattern to separate page elements and interactions from test scripts.

Test data is also maintained separately in JSON format to improve maintainability and reusability.

## How to Run

Clone this repository:

```bash
git clone https://github.com/Fachrurozi-Alwi/Playwright-Automation-Testing-SauceDemo-App.git
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Generate HTML report:

```bash
npx playwright show-report
```

## Test Reporting

Playwright HTML Reporter is used to generate test execution reports, including passed and failed test results.

## Author
Fachrurozi Alwi
QA Automation Portfolio Project.
