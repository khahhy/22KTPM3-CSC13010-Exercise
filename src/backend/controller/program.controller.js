const { loadPrograms, savePrograms } = require("../model/program.model");
const { loadStudents } = require("../model/student.model");
const logger = require("../logger");

function getAllProgram(req, res) {
    const programes = loadPrograms();
    res.json(programes);
}

function addProgram(req, res) {
    const programes = loadPrograms();
    const { name } = req.body;

    if (!name) {
        return res.program(400).json({ message: "Tên chương trình là bắt buộc!" });
    }

    if (programes.some(s => s === name)) {
        logger.warn(`Thêm thất bại: chương trình đã tồn tại (${name})`);
        return res.program(400).json({ message: "chương trình này đã tồn tại" });
    }

    programes.push(name);
    savePrograms(programes);
    logger.info(`Đã thêm chương trình: ${name}`);
    res.program(201).json({ message: "Thêm chương trình thành công", program: name });
}

function deleteProgram(req, res) {
    const { name } = req.params;
    let programes = loadPrograms();
    const students = loadStudents();
    const initialLength = programes.length;
    
    const hasStudents = students.some(student => student.program === name);

    if (hasStudents) {
        return res.program(400).json({ message: "Không thể xóa chương trình vì có sinh viên đang học chương trình này." });
    }

    programes = programes.filter(s => s.name !== name);

    savePrograms(programes);
    logger.info(`Đã xóa chương trình: ${name}`);
    res.json({ message: "Xóa chương trình thành công" });
}

module.exports = {
    getAllProgram,
    addProgram,
    deleteProgram
};
