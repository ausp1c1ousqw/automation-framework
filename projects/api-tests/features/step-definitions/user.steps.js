import { Given, Then, When } from "@cucumber/cucumber";
import UserRequest from "../../UserRequest.js";
Given(
  "I register a new user with email {string} and password {string}",
  async function (email, password) {
    this.response = await UserRequest.registerUser(email, password);
  }
);
Then("the registration should return a token", async function () {
  await this.response.verifyToken();
});

When("I login with email {string} and password {string}", async function (email, password) {
  this.response = await UserRequest.login(email, password);
});

Then("the login response should contain a token", async function () {
  await this.response.verifyToken();
});

When("the HR requests the list of employees on page {int}", async function (pageNumber) {
  this.response = await UserRequest.getUsersOnSpecificPage(pageNumber);
});
Then("the system should return a list of employees", async function () {
  await this.response.verifyEmployeesList();
});
Then("the page should be {int}", async function (pageNumber) {
  await this.response.verifyPage(pageNumber);
});
