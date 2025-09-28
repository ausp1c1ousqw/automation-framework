import { Given, When } from "@wdio/cucumber-framework";
import MainPage from "../../pages/MainPage.js";

Given("I open the main page", async () => {
  await MainPage.open();
});
