export default class NotificationService {
  #observers = new Set();

  subscribe(user) {
    this.#observers.add(user);
  }

  unsubscribe(user) {
    this.#observers.delete(user);
  }

  notify(message) {
    for (const observer of this.#observers) {
      console.log(
        `Notification for ${observer.name} (${observer.email}): ${message}`,
      );
    }
  }

  notifyOverdueTransactions(transactions) {
    const overdueTransactions = transactions.filter(
      (transaction) => transaction.isOverdue,
    );

    for (const transaction of overdueTransactions) {
      this.notify(
        `The book "${transaction.book.title}" borrowed by ` +
          `${transaction.user.name} is overdue. Due date: ` +
          `${transaction.dueDate.toLocaleDateString()}.`,
      );
    }

    return overdueTransactions.length;
  }
}
