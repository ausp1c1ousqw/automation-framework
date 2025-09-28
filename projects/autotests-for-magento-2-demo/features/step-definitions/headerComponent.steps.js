import { Then, When } from "@wdio/cucumber-framework";
import HeaderComponent from "../../pages/HeaderComponent.js";

When("I click Sign In link", async () => {
  await HeaderComponent.clickSignInLink();
});

When("I click Create an Account link", async () => {
  await HeaderComponent.clickCreateAccountLink();
});
Then("I should see welcome message {string}", async (message) => {
  await HeaderComponent.verifyWelcomeMessage(message);
});
