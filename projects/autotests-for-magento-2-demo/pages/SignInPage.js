import { urls } from "../config/urls.js";
import { signInPageSelectors } from "./selectors/selectors.js";
import { BasePage, Button, Label, Input, Checkbox, Link, pageHelpers } from "@sergey/gui-framework";

class SignInPage extends BasePage {
  constructor() {
    super(
      urls.signInPage,
      new Label(signInPageSelectors.signInPageTitle, "SignIn page title"),
      "Customer Login"
    );
  }

  get emailField() {
    return new Input(signInPageSelectors.emailField, "Email field");
  }

  get passwordField() {
    return new Input(signInPageSelectors.passwordField, "Password field");
  }

  get signInButton() {
    return new Button(signInPageSelectors.signInButton, `SignIn button`);
  }

  get topErrorMessage() {
    return new Label(signInPageSelectors.topErrorMessage, "Top error message");
  }

  async enterEmail(email) {
    await this.emailField.typeText(email);
  }

  async enterPassword(password) {
    await this.passwordField.typeText(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async verifyTopErrorMessage(expectedError) {
    const actualError = await this.topErrorMessage.getText();
    await pageHelpers.assertTextsWithLogging(
      actualError,
      expectedError,
      `Assert actual error message: '${actualError}' with expected: ${expectedError}`
    );
  }
}

export default new SignInPage();
