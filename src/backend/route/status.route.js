const express = require("express");

const {
    getAllStatus,
    addStatus,
    deleteStatus
} = require("../controller/status.controller");

const router = express.Router();

router.get("/", getAllStatus);
router.post("/", addStatus);
router.delete("/:name", deleteStatus);

module.exports = router;
