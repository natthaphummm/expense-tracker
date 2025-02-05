# Expense Tracker

This is a simple command-line expense tracker application built with Node.js. It allows you to add, list, summarize, delete, and export expenses.

https://roadmap.sh/projects/expense-tracker

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd expense-tracker
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

Run the application:

```sh
node index.js
```

You can use the following commands:

- **Add a new expense:**

  ```sh
  add --description "<description>" --amount <amount>
  ```

  Example:

  ```sh
  add --description "Lunch" --amount 15
  ```

- **List all expenses:**

  ```sh
  list
  ```

- **Show summary of expenses:**

  ```sh
  summary [--month <MM>]
  ```

  Example:

  ```sh
  summary --month 09
  ```

- **Delete an expense by ID:**

  ```sh
  delete <id>
  ```

  Example:

  ```sh
  delete 1
  ```

- **Export expenses to CSV:**

  ```sh
  export
  ```

- **Show help message:**
  ```sh
  help
  ```
