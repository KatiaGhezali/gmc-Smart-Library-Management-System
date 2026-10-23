import BorrowTransaction from "../models/BorrowTransaction.js";
import NotificationService from "./NotificationService.js";

export default class LibrarySystem {
  static #instance = null;

  #users = [];
  #books = [];
  #transactions = [];
  #nextTransactionId = 1;
  #notificationService = new NotificationService();

  constructor() {
    if (LibrarySystem.#instance) {
      return LibrarySystem.#instance;
    }

    LibrarySystem.#instance = this;
  }

  static getInstance() {
    if (!LibrarySystem.#instance) {
      LibrarySystem.#instance = new LibrarySystem();
    }

    return LibrarySystem.#instance;
  }

  addUser(user) {
    if (this.#users.some((existingUser) => existingUser.id === user.id)) {
      throw new Error(`User ID ${user.id} already exists.`);
    }

    this.#users.push(user);
    return user;
  }

  addBook(book) {
    if (this.#books.some((existingBook) => existingBook.id === book.id)) {
      throw new Error(`Book ID ${book.id} already exists.`);
    }

    this.#books.push(book);
    return book;
  }

  getUsers() {
    return [...this.#users];
  }

  getBooks() {
    return [...this.#books];
  }

  borrowBook(userId, bookId) {
    const user = this.#users.find((item) => item.id === userId);
    const book = this.#books.find((item) => item.id === bookId);

    if (!user) {
      throw new Error(`User ID ${userId} was not found.`);
    }

    if (!book) {
      throw new Error(`Book ID ${bookId} was not found.`);
    }

    if (!book.isAvailable) {
      throw new Error(`"${book.title}" is already borrowed.`);
    }

    book.borrow();

    const transaction = new BorrowTransaction(
      this.#nextTransactionId++,
      user,
      book,
    );

    this.#transactions.push(transaction);
    user.borrowedBooks.push(book);

    return transaction;
  }

  returnBook(transactionId) {
    const transaction = this.#transactions.find(
      (item) => item.id === transactionId,
    );

    if (!transaction) {
      throw new Error(`Transaction ID ${transactionId} was not found.`);
    }

    transaction.returnBook();

    const borrowedBooks = transaction.user.borrowedBooks;
    const bookIndex = borrowedBooks.findIndex(
      (book) => book.id === transaction.book.id,
    );

    if (bookIndex !== -1) {
      borrowedBooks.splice(bookIndex, 1);
    }

    return transaction;
  }

  getBorrowedBooks(userId) {
    const user = this.#users.find((item) => item.id === userId);

    if (!user) {
      throw new Error(`User ID ${userId} was not found.`);
    }

    return [...user.borrowedBooks];
  }

  getTransactions() {
    return [...this.#transactions];
  }

  getOverdueTransactions() {
    return this.#transactions.filter((transaction) => transaction.isOverdue);
  }

  subscribeToNotifications(userId) {
    const user = this.#users.find((item) => item.id === userId);

    if (!user) {
      throw new Error(`User ID ${userId} was not found.`);
    }

    this.#notificationService.subscribe(user);
  }

  unsubscribeFromNotifications(userId) {
    const user = this.#users.find((item) => item.id === userId);

    if (!user) {
      throw new Error(`User ID ${userId} was not found.`);
    }

    this.#notificationService.unsubscribe(user);
  }

  notifyOverdueBooks() {
    return this.#notificationService.notifyOverdueTransactions(
      this.#transactions,
    );
  }
}
