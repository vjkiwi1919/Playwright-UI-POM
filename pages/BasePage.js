class BasePage {
  constructor(page) {
    this.page = page;
    this.baseURL = 'http://jupiter.cloud.planittesting.com';
  }

  async navigate() {
    await this.page.goto(this.baseURL);
  }

  async clickNav(linkName) {
    await this.page.getByRole('link', { name: linkName, exact: true }).first().click();
  }
}

module.exports = BasePage;