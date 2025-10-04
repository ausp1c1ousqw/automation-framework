import BasePage from "../../../src/core/BasePage.js";
import * as pageHelpers from "../../../src/core/pageHelpers.js";
import {
  Button,
  Input,
  Checkbox,
  Label,
  Link,
  Dropdown,
} from "../../../src/core/elements/index.js";
import { signInPageSelectors } from "./selectors/selectors.js";

class SignInPage extends BasePage {
  constructor() {
    super(
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
    await pageHelpers.assertTextsWithLogging(actualError, expectedError);
  }
}

export default new SignInPage();
