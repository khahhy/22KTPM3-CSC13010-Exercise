const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../settings.json");

function loadSettings() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

function saveSettings(settings) {
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2), "utf8");
}

module.exports = { loadSettings, saveSettings };
