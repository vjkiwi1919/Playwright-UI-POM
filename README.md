# Playwright UI Test Suite — Jupiter Toys

An end-to-end UI automation framework built with Playwright using the Page Object Model design pattern. Tests are executed automatically via GitHub Actions on every push to the main branch.

**Repository:** https://github.com/vjkiwi1919/Playwright-UI-POM  
**Application Under Test:** http://jupiter.cloud.planittesting.com  
**Language:** JavaScript (Node.js)  
**Framework:** Playwright  
**Pattern:** Page Object Model (POM)  
**CI/CD:** GitHub Actions  

---

## Test Cases

**TC1 — Contact Form Validation**  
Navigates to the Contact page, submits the form without filling any fields, verifies that the mandatory field error messages appear, then populates the required fields and confirms all errors are resolved.

**TC2 — Successful Contact Form Submission**  
Navigates to the Contact page, fills in all mandatory fields, submits the form, and verifies the success confirmation message is displayed. This test is executed 5 consecutive times to validate a 100% pass rate.

**TC3 — Shopping Cart Verification**  
Adds the following products to the cart — Stuffed Frog (x2), Fluffy Bunny (x5), Valentine Bear (x3). Navigates to the cart page and verifies the unit price and subtotal for each product, then confirms the grand total equals the sum of all subtotals.

---

## Project Structure

```
Playwright-UI-POM/
├── pages/
│   ├── BasePage.js          - Abstract base class with shared navigation methods
│   ├── ContactPage.js       - Contact form locators and assertions
│   ├── ShopPage.js          - Shop navigation and add-to-cart actions
│   └── CartPage.js          - Cart subtotal and total verification
├── tests/
│   └── jupiter.spec.js      - All test cases
├── utils/
│   └── TestDataFactory.js   - Centralised test data
├── config/
│   └── environments.js      - Environment URLs and timeout settings
├── .github/
│   └── workflows/
│       └── playwright.yml   - GitHub Actions pipeline configuration
├── playwright.config.js     - Playwright configuration
└── package.json
```

---

## Viewing the Latest Test Run

1. Go to the repository: https://github.com/vjkiwi1919/Playwright-UI-POM
2. Click the **Actions** tab
3. Select the latest workflow run from the list
4. Click into any job to view the detailed execution logs
5. To view the full HTML report, scroll to the bottom of the workflow run page, locate the **Artifacts** section and download **playwright-report**
6. Unzip the downloaded file and open **index.html** in a browser

The HTML report includes pass/fail status per test, step-by-step execution details, screenshots captured on failure, and video recordings retained on failure.

---

## Re-Running the Tests via GitHub Actions

1. Go to the repository: https://github.com/vjkiwi1919/Playwright-UI-POM
2. Click the **Actions** tab
3. Select **Playwright Tests** from the left sidebar
4. Click the **Run workflow** button on the right
5. Leave the branch as **main** and click **Run workflow**
6. The pipeline will start within a few seconds — refresh the page to monitor progress
7. Once complete, the HTML report will be available under the Artifacts section

---

## Running Locally

### Prerequisites

- Node.js v18 or higher — https://nodejs.org
- Git — https://git-scm.com

### Steps

Clone the repository:
```bash
git clone https://github.com/vjkiwi1919/Playwright-UI-POM.git
cd Playwright-UI-POM
```

Install dependencies:
```bash
npm ci


Install Playwright browsers:
bash
npx playwright install chromium


Run all tests:
```bash
npx playwright test
```

Run in headed mode to watch the browser:
bash
npx playwright test --headed




Open the HTML report after a local run:
bash
npx playwright show-report


---

## Tech Stack

- Playwright — browser automation
- JavaScript / Node.js — scripting language
- Page Object Model — test design pattern
- GitHub Actions — CI/CD pipeline
- JUnit XML — test result format consumed by the pipeline
- Playwright HTML Reporter — visual test report with screenshots and videos
