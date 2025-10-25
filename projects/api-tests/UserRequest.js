import { endpoints } from "./config/endpoints.js";
import config from "./config/config.js";
import UserResponce from "./UserResponse.js";
import { Request } from "@sergey/api-framework";

class UserRequest extends Request {
  constructor() {
    super(config.baseUrl, config.headers, UserResponce);
  }
  async registerUser(email, password) {
    const body = {
      email: email,
      password: password,
    };
    return await this.post(endpoints.register, body);
  }

  async login(email, password) {
    const body = {
      email: email,
      password: password,
    };
    return await this.post(endpoints.login, body);
  }

  async getUsers() {
    return await this.get(endpoints.users);
  }

  async getUserById(id) {
    return await this.get(endpoints.specificUser(id));
  }
  async getUsersOnSpecificPage(pageNumber) {
    return await this.get(endpoints.specificPage(pageNumber));
  }
}
export default new UserRequest();
