const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { Parser } = require("json2csv");
const { loadStudents, saveStudents } = require("../model/student.model");
const logger = require("../logger");

function getAllStudents(req, res) {
    const students = loadStudents();
    const { keyword, department } = req.query;

    const filteredStudents = students.filter(student =>
        (!keyword || student.name.toLowerCase().includes(keyword.toLowerCase())) &&
        (!department || student.faculty.trim().toLowerCase() === department.trim().toLowerCase()) // Sửa so sánh
    );

    res.json(filteredStudents);
}


function getStudentById(req, res) {
    const { mssv } = req.params;
    const students = loadStudents();
    const student = students.find(s => s.mssv === mssv);
    if (!student) {
        return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }
    res.json(student);
}

function addStudent(req, res) {
    const students = loadStudents();
    const newStudent = req.body;

    if (students.some(s => s.mssv === newStudent.mssv)) {
        logger.warn(`Thêm thất bại: MSSV đã tồn tại (${newStudent.mssv})`);
        return res.status(400).json({ message: "MSSV đã tồn tại" });
    }

    students.push(newStudent);
    saveStudents(students);
    logger.info(`Đã thêm sinh viên MSSV: ${newStudent.mssv}`);
    res.status(201).json({ message: "Thêm sinh viên thành công", student: newStudent });
}

function deleteStudent(req, res) {
    const { mssv } = req.params;
    let students = loadStudents();
    const initialLength = students.length;

    students = students.filter(s => s.mssv !== mssv);

    if (students.length === initialLength) {
        logger.warn(`Xóa thất bại: Không tìm thấy MSSV ${mssv}`);
        return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }

    saveStudents(students);
    logger.info(`Đã xóa sinh viên MSSV: ${mssv}`);
    res.json({ message: "Xóa sinh viên thành công" });
}

function updateStudent(req, res) {
    const { mssv } = req.params;
    const updatedStudent = req.body;
    let students = loadStudents();
    let found = false;

    students = students.map(student => {
        if (student.mssv === mssv) {
            found = true;
            logger.info(`Cập nhật MSSV: ${mssv}`);
            return { ...student, ...updatedStudent };
        }
        return student;
    });

    if (!found) {
        logger.warn(`Cập nhật thất bại: Không tìm thấy MSSV ${mssv}`);
        return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }

    saveStudents(students);
    res.json({ message: "Cập nhật sinh viên thành công" });
}

async function importStudents(req, res) {
    const students = req.body;

    if (!Array.isArray(students)) {
        return res.status(400).json({ message: 'Dữ liệu không hợp lệ!' });
    }

    try {
        await saveStudents(students);
        res.json({ message: `Import thành công ${students.length} sinh viên.` });
    } catch (error) {
        console.error('Lỗi khi lưu dữ liệu:', error);
        res.status(500).json({ message: 'Lỗi khi lưu dữ liệu!', error });
    }
}


module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent,
    importStudents
};
