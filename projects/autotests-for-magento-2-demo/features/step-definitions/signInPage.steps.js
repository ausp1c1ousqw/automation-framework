import { When, Then } from "@wdio/cucumber-framework";
import SignInPage from "../../pages/SignInPage.js";

Then("Sign in page is opened", async () => {
  await SignInPage.verifyPageOpened();
});

When("I sign in with email {string} and password {string}", async (email, password) => {
  await SignInPage.enterEmail(email);
  await SignInPage.enterPassword(password);
  await SignInPage.clickSignIn();
});

Then("I should see sign in error {string}", async (message) => {
  // обход капчи через cookie
  await browser.url("https://magento2demo.firebearstudio.com/customer/account/login/");
  await browser.execute(() => {
    document.cookie =
      'mage-messages=[{"type":"error","text":"The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."}]';
  });
  await browser.refresh();
  //
  await SignInPage.verifyTopErrorMessage(message);
});
