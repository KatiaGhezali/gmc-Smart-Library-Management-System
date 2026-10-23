export default class BorrowTransaction {
  constructor(id, user, book, borrowDate = new Date(), dueDate = null) {
    this.id = id;
    this.user = user;
    this.book = book;
    this.borrowDate = borrowDate;
    this.dueDate =
      dueDate ?? new Date(borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    this.returnDate = null;
  }

  returnBook(returnDate = new Date()) {
    if (this.returnDate !== null) {
      throw new Error("This book has already been returned.");
    }

    this.book.returnBook();
    this.returnDate = returnDate;
  }

  get isReturned() {
    return this.returnDate !== null;
  }

  get isOverdue() {
    return !this.isReturned && new Date() > this.dueDate;
  }

  getDetails() {
    return {
      id: this.id,
      user: this.user.name,
      book: this.book.title,
      borrowDate: this.borrowDate.toLocaleDateString(),
      dueDate: this.dueDate.toLocaleDateString(),
      returnDate: this.returnDate ? this.returnDate.toLocaleDateString() : null,
      isReturned: this.isReturned,
      isOverdue: this.isOverdue,
    };
  }
}
