import BasePage from "../../../src/core/BasePage.js";
import {
  Button,
  Input,
  Checkbox,
  Label,
  Link,
  Dropdown,
} from "../../../src/core/elements/index.js";
import { myAccounPageSelectors } from "./selectors/selectors.js";
class MyAccountPage extends BasePage {
  // Page Elements
  get pageTitle() {
    return new ElementWrapper($(myAccounPageSelectors.myAccountPageTitle));
  }
  get editContactInfoLink() {
    return new ElementWrapper($(myAccounPageSelectors.editContactInfoLink));
  }
  get changePasswordLink() {
    return new ElementWrapper($(myAccounPageSelectors.changePasswordLink));
  }
  get manageAdressessLink() {
    return new ElementWrapper($(myAccounPageSelectors.manageAdressessLink));
  }
  get editBillingAdressLink() {
    return new ElementWrapper($(myAccounPageSelectors.editBillingAdressLink));
  }
  get editShippingAdressLink() {
    return new ElementWrapper($(myAccounPageSelectors.editShippingAdressLink));
  }
  get editNewsletterLink() {
    return new ElementWrapper($(myAccounPageSelectors.editNewslettersLink));
  }

  // Actions

  async clickEditNewsletter() {
    await this.click(this.editNewsletterLink);
  }
  async clickEditContactInfo() {
    await this.click(this.editContactInfo);
  }
  async clickManageAdressess() {
    await this.click(this.manageAdressessLink);
  }
  async clickEditBillingAdress() {
    await this.click(this.editBillingAdressLink);
  }
  async clickEditShippingAdress() {
    await this.click(this.editShippingAdressLink);
  }
}

export default new MyAccountPage();
