const Database = require("./database.js");
const db = new Database();

const ExtractArgs = require("./extractArgs.js");
const extractArgs = new ExtractArgs();

class Tracker {
  constructor() {}

  async add(input) {
    const args = extractArgs.add(input);

    if (args === null)
      return console.error(
        'Invalid input format. Use: add --description "<description>" --amount <amount>'
      );

    const data = await db.get();
    data.push({
      id: data[data.length - 1]?.id + 1 || 1,
      description: args.description,
      amount: args.amount,
      date: new Date().toISOString().split("T")[0],
    });
    await db.save(data);
  }

  async list() {
    const data = await db.get();

    if (data.length === 0) return console.log("No data found.");

    console.table(data, ["id", "description", "amount", "date"]);
  }

  async summary(input) {
    const data = await db.get();
    if (data.length === 0) return console.log("No data found.");

    if (input.includes("--month")) {
      let month = extractArgs.summary(input);

      if (month === null)
        return console.error("Invalid input format. Use: summary --month <MM>");

      if (month.length === 1) month = "0" + month;

      const summary = data
        .filter((item) => item.date.split("-")[1] === month)
        .reduce((acc, curr) => acc + curr.amount, 0);

      console.log(`Total expenses for month ${month} : ${summary}`);
    } else {
      const total = data.reduce((acc, curr) => acc + curr.amount, 0);
      console.log(`Total expense: ${total}`);
    }
  }

  async delete(input) {
    const data = await db.get();
    if (data.length === 0) return console.log("No data found.");

    const id = extractArgs.delete(input);
    if (id === null)
      return console.error("Invalid input format. Use: delete <id>");

    const newData = data.filter((item) => item.id !== id);
    await db.save(newData);
  }

  async exportToCSV() {
    await db.exportToCSV();
  }

  help() {
    console.log(`
Available commands:
  add --description "<description>" --amount <amount>  Add a new expense
  list                                                List all expenses
  summary [--month <MM>]                              Show summary of expenses
  delete <id>                                         Delete an expense by ID
  export                                              Export expenses to CSV
  help                                                Show this help message
    `);
  }
}

module.exports = Tracker;
