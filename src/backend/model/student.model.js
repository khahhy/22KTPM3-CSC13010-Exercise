const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/students.json");

function loadStudents() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveStudents(students) {
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2), "utf8");
}

module.exports = { loadStudents, saveStudents };
