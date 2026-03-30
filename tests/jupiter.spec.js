const { test, expect } = require('@playwright/test');
const ContactPage = require('../pages/ContactPage');
const ShopPage    = require('../pages/ShopPage');
const CartPage    = require('../pages/CartPage');

// ─────────────────────────────────────────────
// TEST CASE 1
// Go to contact page → submit empty form →
// verify errors → fill fields → verify errors gone
// ─────────────────────────────────────────────
test('TC1 - Verify mandatory field errors and resolution on Contact page', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Step 1: Navigate to contact page
  await contactPage.goToContactPage();

  // Step 2: Click submit without filling anything
  await contactPage.clickSubmit();

  // Step 3: Verify error messages appear
  await contactPage.verifyErrorsVisible();
  await contactPage.verifyErrorMessages();

  // Step 4: Fill mandatory fields
  await contactPage.fillMandatoryFields({
    forename: 'Vijay',
    email:    'vijay@test.com',
    message:  'This is a test message',
  });

  // Step 5: Verify all errors are gone
  await contactPage.verifyErrorsGone();
});


// ─────────────────────────────────────────────
// TEST CASE 2
// Fill mandatory fields → submit → verify success
// Repeated 5 times using test.describe + loop
// ─────────────────────────────────────────────
for (let run = 1; run <= 5; run++) {
  test(`TC2 - Successful contact form submission (Run ${run} of 5)`, async ({ page }) => {
    const contactPage = new ContactPage(page);

    // Step 1: Navigate to contact page
    await contactPage.goToContactPage();

    // Step 2: Fill mandatory fields
    await contactPage.fillMandatoryFields({
      forename: 'Vijay',
      email:    'vijay@test.com',
      message:  'Automated test submission',
    });

    // Step 3: Submit the form
    await contactPage.clickSubmit();

    // Step 4: Verify success message is shown
    await contactPage.verifySuccessMessage();
  });
}


// ─────────────────────────────────────────────
// TEST CASE 3
// Add products to cart → verify price,
// subtotal per product, and grand total
// ─────────────────────────────────────────────
test('TC3 - Verify cart subtotals and grand total', async ({ page }) => {
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);

  // Products to purchase
  const itemsToBuy = [
    { name: 'Stuffed Frog',   quantity: 2 },
    { name: 'Fluffy Bunny',   quantity: 5 },
    { name: 'Valentine Bear', quantity: 3 },
  ];

  // Step 1: Go to the shop
  await shopPage.goToShop();

  // Step 2: Add each product the required number of times
  for (const item of itemsToBuy) {
    await shopPage.addToCart(item.name, item.quantity);
  }

  // Step 3: Navigate to the cart
  await shopPage.goToCart();

  // Step 4: Verify subtotal for each product and accumulate subtotals
  const subtotals = [];
  for (const item of itemsToBuy) {
    const subtotal = await cartPage.verifyProductSubtotal(item.name, item.quantity);
    subtotals.push(subtotal);
  }

  // Step 5: Verify grand total = sum of subtotals
  await cartPage.verifyGrandTotal(subtotals);
});
