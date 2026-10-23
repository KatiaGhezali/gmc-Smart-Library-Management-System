import User from "./User.js";

export default class Teacher extends User {
  constructor(id, name, email, employeeId) {
    super(id, name, email);
    this.employeeId = employeeId;
  }

  getRole() {
    return "Teacher";
  }

  getDetails() {
    return {
      ...super.getDetails(),
      employeeId: this.employeeId,
    };
  }
}
