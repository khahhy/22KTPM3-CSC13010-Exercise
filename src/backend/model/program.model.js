const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/program.json");

function loadPrograms() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function savePrograms(programs) {
    fs.writeFileSync(filePath, JSON.stringify(programs, null, 2), "utf8");
}

module.exports = { loadPrograms, savePrograms };
