const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { Parser } = require("json2csv");
const { loadStudents, saveStudents } = require("../model/student.model");
const logger = require("../logger");
const { loadSettings } = require("../model/settings.model");
const moment = require("moment");

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
    const settings = loadSettings();
    const newStudent = req.body;

    if (students.some(s => s.mssv === newStudent.mssv)) {
        logger.warn(`Thêm thất bại: MSSV đã tồn tại (${newStudent.mssv})`);
        return res.status(400).json({ message: "MSSV đã tồn tại" });
    }

    if (!newStudent.email.endsWith(settings.allowedEmailDomain)) {
        logger.warn(`Thêm thất bại: Email không hợp lệ (${newStudent.email})`);
        return res.status(400).json({ message: "Email không hợp lệ" });
    }

    
    const isValidPhone = settings.allowedPhonePatterns.some(pattern => 
        new RegExp(pattern).test(newStudent.phone)
    );
    if (!isValidPhone) {
        logger.warn(`Thêm thất bại: Số điện thoại không hợp lệ (${newStudent.phone})`);
        return res.status(400).json({ message: "Số điện thoại không hợp lệ" });
    }

    newStudent.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    students.push(newStudent);
    saveStudents(students);
    logger.info(`Đã thêm sinh viên MSSV: ${newStudent.mssv}`);
    res.status(201).json({ message: "Thêm sinh viên thành công", student: newStudent });
}

function deleteStudent(req, res) {
    const { mssv } = req.params;
    let students = loadStudents();
    const settings = loadSettings(); 
    const initialLength = students.length;

    const student = students.find(s => s.mssv === mssv);
    
    if (!student) {
        logger.warn(`Xóa thất bại: Không tìm thấy MSSV ${mssv}`);
        return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }

    const creationTime = moment(student.createdAt, "YYYY-MM-DD HH:mm:ss").valueOf();
    const now = Date.now();
    const timeLimit = settings.deleteStudentTimeLimit * 1000; 

    if (now - creationTime > timeLimit) {
        logger.warn(`Xóa thất bại: MSSV ${mssv} đã quá thời gian xóa cho phép.`);
        return res.status(403).json({ message: "Sinh viên đã quá thời gian xóa cho phép." });
    }

    students = students.filter(s => s.mssv !== mssv);
    saveStudents(students);
    
    logger.info(`Đã xóa sinh viên MSSV: ${mssv}`);
    res.json({ message: "Xóa sinh viên thành công" });
}


function updateStudent(req, res) {
    const { mssv } = req.params;
    const updatedStudent = req.body;
    let students = loadStudents();
    const settings = loadSettings();
    let found = false;

    students = students.map(student => {
        if (student.mssv === mssv) {
            found = true;
            console.log("Email cập nhật:", updatedStudent.email);
console.log("Domain email hợp lệ:", settings.allowedEmailDomain);
console.log("Kiểm tra endsWith:", updatedStudent.email?.endsWith(settings.allowedEmailDomain));

            if (!updatedStudent.email.trim().endsWith(settings.allowedEmailDomain)) {
                logger.warn(`Cập nhật thất bại: Email không hợp lệ (${updatedStudent.email})`);
                return res.status(400).json({ message: "Email không hợp lệ" });
            }            
            
            const isValidPhone = settings.allowedPhonePatterns.some(pattern => 
                new RegExp(pattern).test(updatedStudent.phone)
            );
            if (!isValidPhone) {
                logger.warn(`Cập nhật thất bại: Số điện thoại không hợp lệ (${updatedStudent.phone})`);
                return res.status(400).json({ message: "Số điện thoại không hợp lệ" });
            }

            const validTransitions = settings.allowedStatusTransitions[student.status] || [];
            if (!validTransitions.includes(updatedStudent.status)) {
                logger.warn(`Cập nhật thất bại: Không thể chuyển từ ${student.status} sang ${updatedStudent.status}`);
                return res.status(400).json({ message: `Không thể chuyển từ ${student.status} sang ${updatedStudent.status}` });
            }

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

function generateDoc(req, res) {
    const { mssv, format } = req.params;
    const { reason } = req.body;
    const students = loadStudents();
    const student = students.find(s => s.mssv === mssv);

    if (!student) {
        return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }

    const universityName = "Trường Đại học Khoa Học Tự Nhiên - Đại học Quốc gia Thành phố Hồ Chí Minh";
    const trainingDepartment = "Phòng Đào Tạo";
    const address = "227 Nguyễn Văn Cừ, Phường 5, Quận 5, Thành phố Hồ Chí Minh";
    const phone = "(028) 62884499 hoặc (028) 73089899";
    const email = "info@hcmus.edu.vn";

    const today = moment().format("DD/MM/YYYY");
    const expireDate = moment().add(3, "months").format("DD/MM/YYYY");

    const content = `
        <h1 style="text-align: center;">${universityName}</h1>
        <h2 style="text-align: center;">${trainingDepartment}</h2>
        <p style="text-align: center;">📍 Địa chỉ: ${address}</p>
        <p style="text-align: center;"> 📞 Điện thoại: ${phone} | 📧 Email: ${email}</p>
        <hr />
        <h2 style="text-align: center;">GIẤY XÁC NHẬN TÌNH TRẠNG SINH VIÊN</h2>
        <div style="width: 60%; margin: 0 auto; text-align: left;">
            <p>Trường Đại học <strong>${universityName}</strong> xác nhận:</p>
            <h3>1. Thông tin sinh viên:</h3>
            <p>- <strong>Họ và tên:</strong> ${student.name}</p>
            <p>- <strong>Mã số sinh viên:</strong> ${student.mssv}</p>
            <p>- <strong>Ngày sinh:</strong> ${student.dob}</p>
            <p>- <strong>Giới tính:</strong> ${student.gender}</p>
            <p>- <strong>Khoa:</strong> ${student.faculty}</p>
            <p>- <strong>Chương trình đào tạo:</strong> ${student.program}</p>
            <p>- <strong>Khóa:</strong> ${student.course}</p>
            <h3>2. Tình trạng sinh viên hiện tại:</h3>
            <p>- ${student.status}</p>
            <h3>3. Mục đích xác nhận:</h3>
            <p>- ${reason}</p>
            <h3>4. Giấy xác nhận có hiệu lực đến ngày:</h3>
            <p>- ${expireDate}</p>
        </div>

        <br />
        <p style="width: 60%; margin: 0 auto; text-align: right;">📅 Ngày cấp: ${today}</p>
        <p style="width: 60%; margin: 0 auto; text-align: right;">🖋 <strong>Trưởng Phòng Đào Tạo</strong></p>
    `;

    if (format === "html") {
        res.setHeader("Content-Type", "text/html");
        return res.send(content);
    } else if (format === "md") {
        const mdContent = `# ${universityName}  
## ${trainingDepartment}  

📍 **Địa chỉ:** ${address}  
📞 **Điện thoại:** ${phone} | 📧 **Email:** ${email}  

---  

# GIẤY XÁC NHẬN TÌNH TRẠNG SINH VIÊN  

${universityName} xác nhận:  

## 1. Thông tin sinh viên:  
- **Họ và tên:** ${student.name}  
- **Mã số sinh viên:** ${student.mssv}  
- **Ngày sinh:** ${student.dob}  
- **Giới tính:** ${student.gender}  
- **Khoa:** ${student.faculty}  
- **Chương trình đào tạo:** ${student.program}  
- **Khóa:** ${student.course}  

## 2. Tình trạng sinh viên hiện tại:  
- ${student.status}

## 3. Mục đích xác nhận:  
- ${reason} 

## 4. Giấy xác nhận có hiệu lực đến ngày:  
- ${expireDate}

📅 **Ngày cấp:** ${today}  

---  

🖋 **Trưởng Phòng Đào Tạo**  
`;

        res.setHeader("Content-Type", "text/markdown");
        return res.send(mdContent);
    } else {
        return res.status(400).json({ message: "Định dạng không hợp lệ!" });
    }
}


module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent,
    importStudents,
    generateDoc
};
