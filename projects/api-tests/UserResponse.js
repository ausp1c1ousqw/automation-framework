import { Response } from "@sergey/api-framework";
class UserResponse extends Response {
  async verifyUserId(id) {
    await this.verifyPropertyValue("id", id);
  }
  async verifyToken() {
    await this.verifyPropertyExists("token");
  }
  async verifyPage(pageNumber) {
    await this.verifyPropertyValue("page", pageNumber);
  }
  async verifyEmployeesList() {
    await this.verifyPropertyType("data", "array");
    await this.verifyKeysInArray("data", ["id", "first_name", "last_name"]);
  }
}
export default UserResponse;
