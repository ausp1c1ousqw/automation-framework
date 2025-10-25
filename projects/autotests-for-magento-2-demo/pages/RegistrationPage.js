import { urls } from "../config/urls.js";
import { registrationPageSelectors } from "./selectors/selectors.js";
import { BasePage, Button, Label, Input, Checkbox, Link, pageHelpers } from "@sergey/gui-framework";

class RegistrationPage extends BasePage {
  constructor() {
    super(
      urls.signInPage,
      new Label(registrationPageSelectors.registrationPageTitle, "Registration page title"),
      "Create New Customer Account"
    );
  }

  get firstNameField() {
    return new Input(registrationPageSelectors.firstNameField, "First name field");
  }

  get lastNameField() {
    return new Input(registrationPageSelectors.lastNameField, "Last name field");
  }

  get emailField() {
    return new Input(registrationPageSelectors.emailField, "Email field");
  }

  get passwordField() {
    return new Input(registrationPageSelectors.passwordField, "Password field");
  }

  get confirmPasswordField() {
    return new Input(registrationPageSelectors.confirmPasswordField, "Confirm password field");
  }

  get newsletterCheckbox() {
    return new Checkbox(registrationPageSelectors.newsletterCheckbox, "Newsletter checkbox");
  }

  get remoteShoppingCheckbox() {
    return new Checkbox(
      registrationPageSelectors.remoteShoppingCheckbox,
      "Remote shopping checkbox"
    );
  }

  get showPasswordCheckbox() {
    return new Checkbox(registrationPageSelectors.showPasswordCheckbox, "Show password checkbox");
  }

  get createAccountButton() {
    return new Button(registrationPageSelectors.createAnAccountButton, "Create Account Button");
  }

  get topErrorMessage() {
    return new Label(registrationPageSelectors.topErrorMessage, "Top error message");
  }

  async verifyTopErrorMessage(expectedError) {
    const actualError = await this.topErrorMessage.getText();
    await pageHelpers.assertTextsWithLogging(
      actualError,
      expectedError,
      `Assert actual error message: '${actualError}' with expected: '${expectedError}'`
    );
  }

  async enterFirstName(firstName) {
    await this.firstNameField.typeText(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameField.typeText(lastName);
  }

  async enterEmail(email) {
    await this.emailField.typeText(email);
  }

  async enterPassword(password) {
    await this.passwordField.typeText(password);
  }

  async enterConfirmPassword(password) {
    await this.confirmPasswordField.typeText(password);
  }

  async clickNewsletter() {
    await this.newsletterCheckbox.click();
  }

  async clickRemoteShopping() {
    await this.remoteShoppingCheckbox.click();
  }

  async clickShowPassword() {
    await this.showPasswordCheckbox.click();
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }
}

export default new RegistrationPage();
