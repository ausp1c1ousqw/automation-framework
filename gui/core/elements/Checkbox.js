import BaseElement from "../BaseElement.js";

class Checkbox extends BaseElement {
  constructor(locator, name) {
    super(locator, name, "Checkbox");
  }

  async isChecked() {
    return this.isSelected();
  }

  async check() {
    if (!(await this.isChecked())) {
      await this.click();
    }
  }

  async uncheck() {
    if (await this.isChecked()) {
      await this.click();
    }
  }
}
export default Checkbox;
