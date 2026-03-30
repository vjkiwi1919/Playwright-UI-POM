const BasePage = require('./BasePage');

class ContactPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.submitBtn       = page.getByRole('link', { name: 'Submit' });
    this.forenameInput   = page.locator('#forename');
    this.emailInput      = page.locator('#email');
    this.messageInput    = page.locator('#message');

    // Error locators
    this.forenameErr     = page.locator('#forename-err');
    this.emailErr        = page.locator('#email-err');
    this.messageErr      = page.locator('#message-err');

    // Success / header message
    this.headerMessage   = page.locator('#header-message');
    this.successMessage  = page.locator('.alert-success');
  }

  async goToContactPage() {
    await this.navigate();
    await this.clickNav('Contact');
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async fillMandatoryFields({ forename, email, message }) {
    await this.forenameInput.fill(forename);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  // --- Assertions ---

  async verifyErrorsVisible() {
    await expect(this.forenameErr).toBeVisible();
    await expect(this.emailErr).toBeVisible();
    await expect(this.messageErr).toBeVisible();
  }

  async verifyErrorMessages() {
    await expect(this.forenameErr).toHaveText('Forename is required');
    await expect(this.emailErr).toHaveText('Email is required');
    await expect(this.messageErr).toHaveText('Message is required');
  }

  async verifyErrorsGone() {
    await expect(this.forenameErr).toBeHidden();
    await expect(this.emailErr).toBeHidden();
    await expect(this.messageErr).toBeHidden();
  }

  async verifySuccessMessage() {
    // Success banner can take a moment to appear — increase timeout
    await expect(this.successMessage).toBeVisible({ timeout: 20000 });
    await expect(this.successMessage).toContainText('Thanks');
  }
}

// ✅ Export both the class and expect (expect needs to be in scope for assertions)
const { expect } = require('@playwright/test');
module.exports = ContactPage;
