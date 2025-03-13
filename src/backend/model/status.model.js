const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/status.json");

function loadStatus() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveStatus(status) {
    fs.writeFileSync(filePath, JSON.stringify(status, null, 2), "utf8");
}

module.exports = { loadStatus, saveStatus };
