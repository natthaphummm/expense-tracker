const readline = require("readline");
const { readJSONFile, writeJSONFile } = require("./database.js");
const path = require("path");
const dbFilePath = path.join(__dirname, "data.json");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Enter your input (type "exit" to quit):');

rl.on("line", async (input) => {
    const [command] = input.split(" ");

    switch (command.trim().toLowerCase()) {
        case "add":
            const args = input.match(
                /--description\s+"([^"]+)"\s+--amount\s+(\d+)/
            );
            if (args) {
                const description = args[1];
                const amount = parseFloat(args[2]);
                await addData({ description, amount });
            } else {
                console.log(
                    'Invalid input format. Use: add --description "<description>" --amount <amount>'
                );
            }
            break;
        case "list":
            await listData();
            break;
        case "summary":
            if (input.includes("--month")) {
                const month = input.split(" ")[2];
                await summaryDataByMonth(month);
            } else {
                await summaryData();
            }
            break;
        case "delete":
            const id = parseInt(input.split(" ")[2]);
            if (isNaN(id)) {
                console.log("Invalid id.");
            } else {
                await deleteData(id);
            }
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

const addData = async ({ description, amount }) => {
    const data = await readJSONFile(dbFilePath);
    const newData = {
        id: data[data.length - 1]?.id + 1 || 1,
        description,
        amount,
        date: new Date().toISOString().split("T")[0],
    };
    data.push(newData);
    await writeJSONFile(dbFilePath, data);
};

const listData = async () => {
    const data = await readJSONFile(dbFilePath);

    if (data.length === 0) {
        console.log("No data found.");
        return;
    }

    console.table(data, ["id", "description", "amount", "date"]);
};

const summaryData = async () => {
    const data = await readJSONFile(dbFilePath);

    if (data.length === 0) {
        console.log("No data found.");
        return;
    }

    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    console.log(`Total expense: ${total}`);
};
const summaryDataByMonth = async (month) => {
    const data = await readJSONFile(dbFilePath);

    if (data.length === 0) {
        console.log("No data found.");
        return;
    }

    if (month.length === 1) {
        month = "0" + month;
    }

    const summary = data
        .filter((item) => item.date.split("-")[1] === month)
        .reduce((acc, curr) => acc + curr.amount, 0);

    console.log(`Total expenses for month ${month} : ${summary}`);
};

const deleteData = async (id) => {
    const data = await readJSONFile(dbFilePath);
    const newData = data.filter((item) => item.id !== id);
    await writeJSONFile(dbFilePath, newData);
};

module.exports = {
    addData,
    listData,
    summaryData,
    summaryDataByMonth,
    deleteData,
};
