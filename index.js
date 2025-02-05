const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Tracker = require("./tracker.js");
const tracker = new Tracker();

rl.on("line", async (input) => {
  const [command] = input.split(" ");

  switch (command.trim().toLowerCase()) {
    case "add":
      await tracker.add(input);
      break;
    case "list":
      await tracker.list(input);
      break;
    case "summary":
      await tracker.summary(input);
      break;
    case "delete":
      await tracker.delete(input);
      break;
    case "export":
      await tracker.exportToCSV();
      break;
    case "help":
      tracker.help();
      break;
    default:
      console.log("Invalid command.");
      break;
  }
});

rl.on("close", () => {
  console.log("CLI app closed.");
  process.exit(0);
});
