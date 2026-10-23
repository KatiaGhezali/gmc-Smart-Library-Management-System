import User from "./User.js";

export default class Student extends User {
  constructor(id, name, email, studentId) {
    super(id, name, email);
    this.studentId = studentId;
  }

  getRole() {
    return "Student";
  }

  getDetails() {
    return {
      ...super.getDetails(),
      studentId: this.studentId,
    };
  }
}
