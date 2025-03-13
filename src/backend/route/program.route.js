const express = require("express");

const {
    getAllProgram,
    addProgram,
    deleteProgram
} = require("../controller/program.controller");

const router = express.Router();

router.get("/", getAllProgram);
router.post("/", addProgram);
router.delete("/:name", deleteProgram);

module.exports = router;
