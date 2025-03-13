const { loadDepartments, saveDepartments } = require("../model/department.model");
const { loadStudents } = require("../model/student.model");
const logger = require("../logger");

function getAllDepartments(req, res) {
    const departments = loadDepartments();
    res.json(departments);
}

function addDepartment(req, res) {
    const departments = loadDepartments();
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Tên khoa là bắt buộc!" });
    }

    if (departments.some(d => d.name === name)) {
        logger.warn(`Thêm thất bại: Khoa đã tồn tại (${name})`);
        return res.status(400).json({ message: "Khoa đã tồn tại" });
    }

    departments.push({ name });
    saveDepartments(departments);
    logger.info(`Đã thêm khoa: ${name}`);
    res.status(201).json({ message: "Thêm khoa thành công", department: { name } });
}

function deleteDepartment(req, res) {
    const { name } = req.params;
    let departments = loadDepartments();
    const students = loadStudents();
    const initialLength = departments.length;

    const hasStudents = students.some(student => student.faculty === name);

    if (hasStudents) {
        return res.status(400).json({ message: "Không thể xóa khoa vì có sinh viên đang học trong khoa này." });
    }

    departments = departments.filter(d => d.name !== name);

    if (departments.length === initialLength) {
        logger.warn(`Xóa thất bại: Không tìm thấy khoa ${name}`);
        return res.status(404).json({ message: "Không tìm thấy khoa" });
    }

    saveDepartments(departments);
    logger.info(`Đã xóa khoa: ${name}`);
    res.json({ message: "Xóa khoa thành công" });
}

module.exports = {
    getAllDepartments,
    addDepartment,
    deleteDepartment
};
