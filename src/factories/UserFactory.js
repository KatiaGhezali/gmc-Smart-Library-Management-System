import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

export default class UserFactory {
  static createUser(type, details) {
    const { id, name, email } = details;

    switch (type.toLowerCase()) {
      case "student":
        if (!details.studentId) {
          throw new Error("A student ID is required.");
        }

        return new Student(id, name, email, details.studentId);

      case "teacher":
        if (!details.employeeId) {
          throw new Error("An employee ID is required.");
        }

        return new Teacher(id, name, email, details.employeeId);

      default:
        throw new Error(`Invalid user type: ${type}`);
    }
  }
}
