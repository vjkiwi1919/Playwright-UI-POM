const BasePage = require('./BasePage');

class ShopPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async goToShop() {
    await this.navigate();
    await this.page.getByRole('link', { name: 'Shop', exact: true }).first().click();
  }

  async addToCart(productName, quantity) {
    // Wait for products to load first
    await this.page.waitForSelector('.products');

    const productCard = this.page.locator('.product').filter({ hasText: productName });

    for (let i = 0; i < quantity; i++) {
      await productCard.locator('a.btn').click();  // "Buy" is an anchor tag not a button
    }
  }

  async goToCart() {
    await this.page.getByRole('link', { name: /cart/i }).click();
  }
}

module.exports = ShopPage;