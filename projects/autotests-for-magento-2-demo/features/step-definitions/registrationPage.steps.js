import { When, Then } from "@wdio/cucumber-framework";
import RegistrationPage from "../../pages/RegistrationPage.js";

Then("Registration page is opened", async () => {
  await RegistrationPage.verifyPageOpened();
});

When("I register a new account with:", async (dataTable) => {
  const data = dataTable.rows()[0];
  const [firstName, lastName, email, password] = data;

  await RegistrationPage.enterFirstName(firstName);
  await RegistrationPage.enterLastName(lastName);
  await RegistrationPage.enterEmail(email);
  await RegistrationPage.enterPassword(password);
  await RegistrationPage.enterConfirmPassword(password);
  await RegistrationPage.clickNewsletter();
  await RegistrationPage.clickRemoteShopping();
  await RegistrationPage.clickCreateAccount();
});

Then("I should see registration error {string}", async (message) => {
  await RegistrationPage.verifyTopErrorMessage(message);
});
