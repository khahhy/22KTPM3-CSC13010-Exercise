const express = require("express");
const cors = require("cors");
const studentRoutes = require("./route/student.route");
const departmentRoutes = require("./route/department.route");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.use("/api/students", studentRoutes);
app.use('/api/departments', departmentRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Student Management System API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
