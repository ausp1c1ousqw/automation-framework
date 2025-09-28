import { Given, When } from "@wdio/cucumber-framework";
import NavigationComponent from "../../pages/NavigationComponent.js";

When("I open {string} in navigation menu", async (path) => {
  await NavigationComponent.openMenuItem(path);
});
