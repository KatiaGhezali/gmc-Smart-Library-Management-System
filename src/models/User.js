export default class User {
  constructor(id, name, email) {
    if (new.target === User) {
      throw new Error(
        "User is an abstract class and cannot be instantiated directly.",
      );
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowedBooks = [];
  }

  getRole() {
    throw new Error("The getRole() method must be implemented by a subclass.");
  }

  getDetails() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.getRole(),
    };
  }
}
