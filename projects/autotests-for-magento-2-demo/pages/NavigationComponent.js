import { navigationSelectors } from "./selectors/selectors.js";
import { BasePage, Button, Label, Input, Checkbox, Link, pageHelpers } from "@sergey/gui-framework";

class NavigationComponent extends BasePage {
  // Page Elements

  async openMenuItem(string) {
    const array = string.split(" > ");
    let currentItems = navigationSelectors.navMenu.items;
    let elLink;
    for (let i = 0; i < array.length; i++) {
      elLink = currentItems.find((item) => item.name === array[i]);
      if (!elLink) {
        const variants = currentItems.map((item) => item.name).join(", ");
        throw new Error(
          `There is no ${i + 1}-level menu item with name "${array[i]}". Possible variants:  ${
            currentItems.length ? currentItems.map((item) => item.name).join(", ") : "none"
          }`
        );
      }
      await this.moveTo(new ElementWrapper($(elLink.selector)));
      currentItems = elLink.items || [];
    }
    await this.click(new ElementWrapper($(elLink.selector)));
  }
}

export default new NavigationComponent();
