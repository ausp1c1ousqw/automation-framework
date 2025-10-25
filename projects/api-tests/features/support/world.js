import { setWorldConstructor } from "@cucumber/cucumber";

class CustomWorld {
  constructor() {
    this.response = null;
  }
}

setWorldConstructor(CustomWorld);
