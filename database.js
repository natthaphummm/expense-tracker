const fs = require("fs").promises;
const path = require("path");
const { parse } = require("json2csv");

class Database {
  constructor() {
    this.filePath = path.join(__dirname, "data.json");
  }

  async save(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.filePath, jsonData, "utf8");
      console.log("File has been written");
    } catch (err) {
      console.error(`Error writing file to disk: ${err}`);
    }
  }

  async get() {
    try {
      await fs.access(this.filePath);
    } catch {
      console.error(`File not found: ${this.filePath}. Creating a new file.`);
      await this.save(this.filePath, []);
      return [];
    }
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error(`Error reading file from disk: ${err}`);
      return [];
    }
  }

  async exportToCSV() {
    const data = await this.get();
    if (data.length === 0) return console.log("No data found.");

    const csv = parse(data, {
      fields: ["id", "description", "amount", "date"],
    });
    const csvFilePath = path.join(__dirname, "data.csv");

    try {
      await fs.writeFile(csvFilePath, csv, "utf8");
      console.log(`CSV file has been written to ${csvFilePath}`);
    } catch (err) {
      console.error(`Error writing CSV file to disk: ${err}`);
    }
  }
}

module.exports = Database;
