const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  parseCurrency(text) {
    return parseFloat(text.replace('$', '').trim());
  }

  async getRowData(productName) {
    const row = this.page.locator('tr').filter({ hasText: productName });

    const priceText    = await row.locator('td:nth-child(2)').innerText();
    const qtyText      = await row.locator('td:nth-child(3) input').inputValue();
    const subtotalText = await row.locator('td:nth-child(4)').innerText();

    const price    = this.parseCurrency(priceText);
    const qty      = parseInt(qtyText);
    const subtotal = this.parseCurrency(subtotalText);

    return { price, qty, subtotal };
  }

  async getDisplayedTotal() {
    // Get ALL td text contents and find the one after "Total"
    const rows = this.page.locator('tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const rowText = await rows.nth(i).innerText();
      console.log(`Row ${i}: ${rowText}`);  // ← this will show us the structure
      if (rowText.toLowerCase().includes('total')) {
        // Extract any dollar amount from this row
        const match = rowText.match(/\$?([\d.]+)/g);
        if (match) {
          const lastAmount = match[match.length - 1];
          return this.parseCurrency(lastAmount);
        }
      }
    }
    throw new Error('Could not find Total row in cart table');
  }

  async verifyProductSubtotal(productName, expectedQty) {
    const { price, qty, subtotal } = await this.getRowData(productName);

    expect(qty).toBe(expectedQty);

    const expectedSubtotal = parseFloat((price * qty).toFixed(2));
    expect(subtotal).toBe(expectedSubtotal);

    console.log(`✅ ${productName} | Price: $${price} | Qty: ${qty} | Subtotal: $${subtotal}`);

    return subtotal;
  }

  async verifyGrandTotal(subtotals) {
    const calculatedTotal = parseFloat(subtotals.reduce((sum, s) => sum + s, 0).toFixed(2));
    const displayedTotal  = await this.getDisplayedTotal();

    expect(displayedTotal).toBe(calculatedTotal);
    console.log(`✅ Grand Total: $${displayedTotal} = Sum of Subtotals: $${calculatedTotal}`);
  }
}

module.exports = CartPage;