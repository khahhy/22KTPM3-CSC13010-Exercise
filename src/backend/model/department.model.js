const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../departments.json");

function loadDepartments() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveDepartments(departments) {
    fs.writeFileSync(filePath, JSON.stringify(departments, null, 2), "utf8");
}

module.exports = { loadDepartments, saveDepartments };
