const fs = require("fs").promises;

const writeJSONFile = async (filePath, data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonData, "utf8");
        console.log("File has been written");
    } catch (err) {
        console.error(`Error writing file to disk: ${err}`);
    }
};

const readJSONFile = async (filePath) => {
    try {
        await fs.access(filePath);
    } catch {
        console.error(`File not found: ${filePath}. Creating a new file.`);
        await writeJSONFile(filePath, []);
        return [];
    }
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return [];
    }
};

module.exports = {
    readJSONFile,
    writeJSONFile,
};
