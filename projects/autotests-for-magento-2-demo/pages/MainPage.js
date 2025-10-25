import { urls } from "../config/urls.js";
import { mainPageSelectors } from "./selectors/selectors.js";
import { BasePage, Button, Label, Input, Checkbox, Link, pageHelpers } from "@sergey/gui-framework";

class MainPage extends BasePage {
  constructor() {
    super(
      urls.mainPage,
      new Label(mainPageSelectors.pageTitle, "Main page title"),
      "Welcome to FireBear Studio Magento 2 demo"
    );
  }
}
export default new MainPage();
