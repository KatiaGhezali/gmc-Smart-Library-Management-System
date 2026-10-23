import LibrarySystem from "./src/services/LibrarySystem.js";
import UserFactory from "./src/factories/UserFactory.js";
import Book from "./src/models/Book.js";

const library = LibrarySystem.getInstance();

console.log("========== SINGLETON TEST ==========");

const anotherLibrary = LibrarySystem.getInstance();
console.log("Same instance:", library === anotherLibrary);

console.log("\n========== CREATE USERS ==========");

const student = UserFactory.createUser("student", {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  studentId: "STU001",
});

const teacher = UserFactory.createUser("teacher", {
  id: 2,
  name: "Mr. Smith",
  email: "smith@example.com",
  employeeId: "EMP001",
});

library.addUser(student);
library.addUser(teacher);

console.log("Users added:", library.getUsers().length);

console.log("\n========== ADD BOOKS ==========");

const book1 = new Book(1, "Clean Code", "Robert C. Martin", "9780132350884");

const book2 = new Book(
  2,
  "The Pragmatic Programmer",
  "Andrew Hunt and David Thomas",
  "9780135957059",
);

library.addBook(book1);
library.addBook(book2);

console.log("Books added:", library.getBooks().length);

console.log("\n========== BORROW BOOK ==========");

const transaction = library.borrowBook(student.id, book1.id);

console.log("Transaction ID:", transaction.id);
console.log("Book:", transaction.book.title);
console.log("Available:", book1.isAvailable);

console.log("\n========== VIEW BORROWED BOOKS ==========");

console.log(library.getBorrowedBooks(student.id).map((book) => book.title));

console.log("\n========== ERROR HANDLING ==========");

try {
  library.borrowBook(999, book2.id);
} catch (error) {
  console.log("Invalid user:", error.message);
}

try {
  library.addBook(book2);
} catch (error) {
  console.log("Duplicate book:", error.message);
}

console.log("\n========== OVERDUE NOTIFICATIONS ==========");

library.subscribeToNotifications(student.id);

// Simulate an overdue transaction by setting its due date in the past.
transaction.dueDate = new Date("2026-01-01");

console.log("Overdue transactions:", library.getOverdueTransactions().length);

library.notifyOverdueBooks();

console.log("\n========== RETURN BOOK ==========");

library.returnBook(transaction.id);

console.log("Book available:", book1.isAvailable);
console.log("Transaction returned:", transaction.isReturned);
console.log(
  "Borrowed books remaining:",
  library.getBorrowedBooks(student.id).length,
);
console.log(
  "Overdue transactions remaining:",
  library.getOverdueTransactions().length,
);

console.log("\n========== ALL TESTS COMPLETED ==========");
