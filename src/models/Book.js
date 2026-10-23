export default class Book {
  #isAvailable;

  constructor(id, title, author, isbn) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.#isAvailable = true;
  }

  get isAvailable() {
    return this.#isAvailable;
  }

  borrow() {
    if (!this.#isAvailable) {
      throw new Error(`"${this.title}" is already borrowed.`);
    }

    this.#isAvailable = false;
  }

  returnBook() {
    if (this.#isAvailable) {
      throw new Error(`"${this.title}" is already available.`);
    }

    this.#isAvailable = true;
  }

  getDetails() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      isAvailable: this.#isAvailable,
    };
  }
}
