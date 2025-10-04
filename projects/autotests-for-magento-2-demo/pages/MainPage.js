import BasePage from "../../../src/core/BasePage.js";
import * as pageHelpers from "../../../src/core/pageHelpers.js";
import {
  Button,
  Input,
  Checkbox,
  Label,
  Link,
  Dropdown,
} from "../../../src/core/elements/index.js";
import { urls } from "../config/urls.js";
import { mainPageSelectors } from "./selectors/selectors.js";

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
