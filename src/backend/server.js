const express = require("express");
const cors = require("cors");
const studentRoutes = require("./route/student.route");
const departmentRoutes = require("./route/department.route");
const statusRoutes = require("./route/status.route");
const settingsRoutes = require("./route/settings.route");
const programRoutes = require("./route/program.route");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.use("/api/students", studentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/programs', programRoutes);

app.get("/", (req, res) => {
    res.send("yo");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
