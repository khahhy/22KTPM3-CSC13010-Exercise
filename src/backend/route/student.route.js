const express = require("express");
const multer = require("multer");
const {
    getAllStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent,
    importStudents,
    generateDoc
} = require("../controller/student.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); 

router.get("/", getAllStudents);
router.get("/:mssv", getStudentById);
router.post("/", addStudent);
router.put("/:mssv", updateStudent);
router.delete("/:mssv", deleteStudent);


router.post("/import", upload.single("file"), importStudents);
router.post("/certificate/:mssv/:format", generateDoc);


module.exports = router;
