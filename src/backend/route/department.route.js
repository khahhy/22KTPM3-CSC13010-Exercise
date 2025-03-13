const express = require("express");

const {
    getAllDepartments,
    addDepartment,
    deleteDepartment
} = require("../controller/department.controller");

const router = express.Router();

router.get("/", getAllDepartments);
router.post("/", addDepartment);
router.delete("/:name", deleteDepartment);

module.exports = router;
