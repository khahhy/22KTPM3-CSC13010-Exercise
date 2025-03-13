const { loadStatus, saveStatus } = require("../model/status.model");
const { loadStudents } = require("../model/student.model");
const logger = require("../logger");

function getAllStatus(req, res) {
    const statuses = loadStatus();
    res.json(statuses);
}

function addStatus(req, res) {
    const statuses = loadStatus();
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Tên tình trạng là bắt buộc!" });
    }

    if (statuses.some(s => s === name)) {
        logger.warn(`Thêm thất bại: Tình trạng đã tồn tại (${name})`);
        return res.status(400).json({ message: "Tình trạng này đã tồn tại" });
    }

    statuses.push(name);
    saveStatus(statuses);
    logger.info(`Đã thêm tình trạng: ${name}`);
    res.status(201).json({ message: "Thêm tình trạng thành công", status: name });
}

function deleteStatus(req, res) {
    const { name } = req.params;
    let statuses = loadStatus();
    const students = loadStudents();
    const initialLength = statuses.length;
    
    const hasStudents = students.some(student => student.status === name);

    if (hasStudents) {
        return res.status(400).json({ message: "Không thể xóa tình trạng vì có sinh viên đang ở trạng thái này." });
    }

    statuses = statuses.filter(s => s.name !== name);

    saveStatus(statuses);
    logger.info(`Đã xóa tình trạng: ${name}`);
    res.json({ message: "Xóa tình trạng thành công" });
}

module.exports = {
    getAllStatus,
    addStatus,
    deleteStatus
};
