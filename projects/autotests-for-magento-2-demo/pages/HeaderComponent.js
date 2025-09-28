import BasePage from "../../../src/core/BasePage.js";
import {
  Button,
  Input,
  Checkbox,
  Label,
  Link,
  Dropdown,
} from "../../../src/core/elements/index.js";
import { headerSelectors } from "./selectors/selectors.js";

class HeaderComponent extends BasePage {
  get signInLink() {
    return new Link(headerSelectors.signInLink, "SignIn Link");
  }
  get welcomeMessage() {
    return new Label(headerSelectors.welcomeMessage, "Welcome message");
  }
  get createAccountLink() {
    return new Link(headerSelectors.createAccountLink, "Create Account Link");
  }

  async clickSignInLink() {
    await this.signInLink.click();
  }
  async clickCreateAccountLink() {
    await this.createAccountLink.click();
  }
  async verifyWelcomeMessage(expected) {
    const actual = await this.welcomeMessage.getText();
    await this.verifyText(actual, expected);
  }
}
export default new HeaderComponent();
