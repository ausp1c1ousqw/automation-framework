import { myAccounPageSelectors } from "./selectors/selectors.js";
import { BasePage, Button, Label, Input, Checkbox, Link, pageHelpers } from "@sergey/gui-framework";

class MyAccountPage extends BasePage {
  constructor() {
    super(
      new Label(myAccounPageSelectors.myAccountPageTitle, "My Account page title"),
      "Customer Login"
    );
  }
  get editContactInfoLink() {
    return new Link(myAccounPageSelectors.editContactInfoLink, "Edit Contact Link");
  }

  get changePasswordLink() {
    return new Link(myAccounPageSelectors.changePasswordLink, "Change Password Link");
  }

  get manageAdressesLink() {
    return new Link(myAccounPageSelectors.manageAdressessLink, "Manage Adresses Link");
  }

  get editBillingAdressLink() {
    return new Link(myAccounPageSelectors.editBillingAdressLink, "Edit Billing Adress Link");
  }

  get editShippingAdressLink() {
    return new Link(myAccounPageSelectors.editShippingAdressLink, "Edit Shipping Adress Link");
  }

  get editNewsletterLink() {
    return new Link(myAccounPageSelectors.editNewslettersLink, "Edit NewsLetter Link");
  }

  async clickEditNewsletter() {
    await this.click(this.editNewsletterLink);
  }

  async clickEditContactInfo() {
    await this.click(this.editContactInfo);
  }

  async clickManageAdressess() {
    await this.click(this.manageAdressesLink);
  }

  async clickEditBillingAdress() {
    await this.click(this.editBillingAdressLink);
  }

  async clickEditShippingAdress() {
    await this.click(this.editShippingAdressLink);
  }
}

export default new MyAccountPage();
