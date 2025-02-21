const fs = require('fs');
const csv = require('csv-parser'); 
const { Parser } = require('json2csv');
const logger = require('./logger'); 
const path = require('path');

const file_path = path.join(__dirname, 'students.json');


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9]{10,11}$/; 
    return phoneRegex.test(phoneNumber);
}

function isValidFaculty(faculty) {
    const validFaculties = ['Khoa Luật', 'Khoa Tiếng Anh thương mại', 'Khoa Tiếng Nhật', 'Khoa Tiếng Pháp'];
    return validFaculties.includes(faculty);
}

function isValidStudentStatus(status) {
    const validStatuses = ['Đang học', 'Đã tốt nghiệp', 'Đã thôi học', 'Tạm dừng học'];
    return validStatuses.includes(status);
}

function loadStudents() {
    try {
        const data = fs.readFileSync(file_path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveStudents(students) {
    fs.writeFileSync(file_path, JSON.stringify(students, null, 2), 'utf8'); 
}

function addStudent(student) {
    const students = loadStudents();

    if (!isValidEmail(student.email)) {
        logger.warn(`Thêm sinh viên thất bại: Email sai định dạng (${student.email})`);
        console.log("Email sai định dạng.");
        return false;
    }
    if (!isValidPhoneNumber(student.phoneNumber)) {
        logger.warn(`Thêm sinh viên thất bại: Số điện thoại sai định dạng (${student.phoneNumber})`);
        console.log("Số điện thoại sai định dạng.");
        return false;
    }
    if (!isValidFaculty(student.khoa)) {
        logger.warn(`Thêm sinh viên thất bại: Khoa không hợp lệ (${student.khoa})`);
        console.log("Tên khoa sai định dạng.");
        return false;
    }
    if (!isValidStudentStatus(student.tinhTrang)) {
        logger.warn(`Thêm sinh viên thất bại: Tình trạng không hợp lệ (${student.tinhTrang})`);
        console.log("Thông tin tình trạng sinh viên sai định dạng.");
        return false;
    }

    students.push(student);
    saveStudents(students);
    logger.info(`Đã thêm sinh viên MSSV: ${student.mssv}, Họ tên: ${student.hoTen}`);
    return true;
}


function deleteStudent(mssv) {
    let students = loadStudents();
    const initialLength = students.length;

    students = students.filter(student => student.mssv !== mssv);

    if (students.length < initialLength) {
        saveStudents(students);
        logger.info(`Đã xóa sinh viên MSSV: ${mssv}`);
        return true; 
    } else {
        logger.warn(`Xóa thất bại: Không tìm thấy MSSV: ${mssv}`);
        return false; 
    }
}


function updateStudent(mssv, updatedStudent) {
    let students = loadStudents();
    let found = false;

    students = students.map(student => {
        if (student.mssv === mssv) {
            if (updatedStudent.email && !isValidEmail(updatedStudent.email)) {
                console.log("Email sai định dạng.");
                logger.warn(`Cập nhật thất bại: Email không hợp lệ (${updatedStudent.email})`);
                return student; 
            }
            if (updatedStudent.phoneNumber && !isValidPhoneNumber(updatedStudent.phoneNumber)) {
                console.log("Số điện thoại sai định dạng.");
                logger.warn(`Cập nhật thất bại: Số điện thoại không hợp lệ (${updatedStudent.phoneNumber})`);
                return student;
            }
            if (updatedStudent.khoa && !isValidFaculty(updatedStudent.khoa)) {
                console.log("Tên khoa sai định dạng.");
                logger.warn(`Cập nhật thất bại: Khoa không hợp lệ (${updatedStudent.khoa})`);
                return student;
            }
            if (updatedStudent.tinhTrang && !isValidStudentStatus(updatedStudent.tinhTrang)) {
                console.log("Thông tin tình trạng sinh viên sai định dạng.");
                logger.warn(`Cập nhật thất bại: Tình trạng không hợp lệ (${updatedStudent.tinhTrang})`);
                return student;
            }


            found = true;
            logger.info(`Cập nhật MSSV: ${mssv}, Thông tin mới: ${JSON.stringify(updatedStudent)}`);
            return { ...student, ...updatedStudent }; 
        }
        return student;
    });

    if (found) {
        saveStudents(students);
        return true; 
    } else {
        logger.warn(`Cập nhật thất bại: Không tìm thấy MSSV: ${mssv}`);
        return false; 
    }
}


function searchStudents(searchTerm, faculty = null) {
    const students = loadStudents();
    const searchTermLower = searchTerm.toLowerCase();

    return students.filter(student => {
        const matchNameOrMSSV = student.hoTen.toLowerCase().includes(searchTermLower) ||
                                student.mssv.toLowerCase().includes(searchTermLower);

        const matchFaculty = faculty ? student.khoa.toLowerCase() === faculty.toLowerCase() : true;

        return matchNameOrMSSV && matchFaculty;
    });
}


function updateStudentFaculty(mssv, newFaculty) {
    let students = loadStudents();
    let found = false;

    students = students.map(student => {
        if (student.mssv === mssv) {
            if (!isValidFaculty(newFaculty)) {
                console.log("Tên khoa không hợp lệ.");
                logger.warn(`Cập nhật thất bại: Khoa không hợp lệ (${newFaculty})`);
                return student;
            }
            found = true;
            logger.info(`Cập nhật MSSV: ${mssv}, Khoa mới: ${newFaculty}`);
            return { ...student, khoa: newFaculty };
        }
        return student;
    });

    if (found) {
        saveStudents(students);
        console.log("Cập nhật khoa thành công!");
        return true;
    } else {
        console.log("Không tìm thấy MSSV.");
        return false;
    }
}

function updateStudentStatus(mssv, newStatus) {
    let students = loadStudents();
    let found = false;

    students = students.map(student => {
        if (student.mssv === mssv) {
            if (!isValidStudentStatus(newStatus)) {
                console.log("Tình trạng sinh viên không hợp lệ.");
                logger.warn(`Cập nhật thất bại: Tình trạng không hợp lệ (${newStatus})`);
                return student;
            }
            found = true;
            logger.info(`Cập nhật MSSV: ${mssv}, Tình trạng mới: ${newStatus}`);
            return { ...student, tinhTrang: newStatus };
        }
        return student;
    });

    if (found) {
        saveStudents(students);
        console.log("Cập nhật tình trạng sinh viên thành công!");
        return true;
    } else {
        console.log("Không tìm thấy MSSV.");
        return false;
    }
}

function updateStudentProgram(mssv, newProgram) {
    let students = loadStudents();
    let found = false;

    students = students.map(student => {
        if (student.mssv === mssv) {
            found = true;
            logger.info(`Cập nhật MSSV: ${mssv}, Chương trình đào tạo mới: ${newProgram}`);
            return { ...student, chuongTrinh: newProgram };
        }
        return student;
    });

    if (found) {
        saveStudents(students);
        console.log("Cập nhật chương trình đào tạo thành công!");
        return true;
    } else {
        console.log("Không tìm thấy MSSV.");
        return false;
    }
}

function importStudents(filePath) {
    const students = loadStudents(); 
    const fileExt = path.extname(filePath).toLowerCase();

    if (!fs.existsSync(filePath)) {
        console.log(`Lỗi: Không tìm thấy file tại đường dẫn: ${filePath}`);
        return;
    }

    if (fileExt === '.json') {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const newStudents = JSON.parse(data);
            students.push(...newStudents);
            saveStudents(students);
            console.log(`Đã import ${newStudents.length} sinh viên từ JSON.`);
        } catch (error) {
            console.error("Lỗi khi đọc JSON:", error);
        }
    } else if (fileExt === '.csv') {
        const newStudents = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => newStudents.push(row))
            .on('end', () => {
                students.push(...newStudents);
                saveStudents(students);
                console.log(`Đã import ${newStudents.length} sinh viên từ CSV.`);
            });
    } else {
        console.log("Định dạng file không hỗ trợ (chỉ hỗ trợ .csv và .json).");
    }
}

function exportStudents(filePath) {
    const students = loadStudents(); 
    const fileExt = path.extname(filePath).toLowerCase();

    if (fileExt === '.json') {
        fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf8');
        console.log(`Dữ liệu sinh viên đã được xuất ra JSON: ${filePath}`);
    } else if (fileExt === '.csv') {
        try {
            const parser = new Parser();
            const csvData = parser.parse(students);
            fs.writeFileSync(filePath, '\uFEFF' + csvData, 'utf8'); 
            console.log(`Dữ liệu sinh viên đã được xuất ra CSV: ${filePath}`);
        } catch (error) {
            console.error("Lỗi khi xuất CSV:", error.message);
        }
    } else {
        console.log("Định dạng file không hỗ trợ (chỉ hỗ trợ .csv và .json).");
    }
}

function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    function askQuestion(query) {
        return new Promise(resolve => readline.question(query, resolve));
    }

    async function runMenu() {
        while (true) {
            console.log("\nQuản lý danh sách sinh viên");
            console.log("1. Thêm sinh viên mới");
            console.log("2. Xóa sinh viên");
            console.log("3. Cập nhật thông tin sinh viên");
            console.log("3.1. Cập nhật khoa sinh viên");
            console.log("3.2. Cập nhật tình trạng sinh viên");
            console.log("3.3. Cập nhật chương trình đào tạo");

            console.log("4. Tìm kiếm sinh viên");
            console.log("5. Xem tất cả sinh viên");

            console.log("6. Import dữ liệu");
            console.log("7. Export dữ liệu");
            console.log("8. Thoát");

            const choice = await askQuestion("Lựa chọn: ");

            switch (choice) {
                case '1': 
                    const mssv = await askQuestion("Nhập MSSV: ");
                    const hoTen = await askQuestion("Nhập Họ tên: ");
                    const ngaySinh = await askQuestion("Nhập ngày tháng năm sinh (dd/mm/yyyy: ");
                    const gioiTinh = await askQuestion("Nhập giới tính: ");
                    const khoa = await askQuestion("Nhập khoa: ");
                    const khoaHoc = await askQuestion("Nhập khóa: ");
                    const chuongTrinh = await askQuestion("Nhập chương trình: ");
                    const diaChi = await askQuestion("Nhập địa chỉ: ");
                    const email = await askQuestion("Nhập Email: ");
                    const phoneNumber = await askQuestion("Nhập số điện thoại: ");
                    const tinhTrang = await askQuestion("Nhập tình trạng sinh viên: ");

                    const newStudent = {
                        mssv,
                        hoTen,
                        ngaySinh,
                        gioiTinh,
                        khoa,
                        khoaHoc,
                        chuongTrinh,
                        diaChi,
                        email,
                        phoneNumber,
                        tinhTrang
                    };

                    if (addStudent(newStudent)) {
                        console.log("Thêm sinh viên thành công!");
                    } else {
                        console.log("Thêm sinh viên thất bại");
                    }
                    break;

                case '2': 
                    const mssvToDelete = await askQuestion("Xóa theo MSSV: ");
                    if (deleteStudent(mssvToDelete)) {
                        console.log("Xóa sinh viên thành công!");
                    } else {
                        console.log("Không tìm thấy MSSV");
                    }
                    break;

                case '3': 
                    const mssvToUpdate = await askQuestion("Cập nhật theo MSSV: ");
                    const updateField = await askQuestion("Nhập trường cần update (mssv,hoTen,ngaySinh,gioiTinh,khoa,khoaHoc,chuongTrinh, diaChi,email,phoneNumber,tinhTrang): ");
                    const newValue = await askQuestion(`Nhập giá trị mới cho ${updateField}: `);

                    const updateObject = {};
                    updateObject[updateField] = newValue;


                    if (updateStudent(mssvToUpdate, updateObject)) {
                        console.log("Cập nhật sinh viên thành công");
                    } else {
                        console.log("Không tìm thấy MSSV");
                    }
                    break;
                
                    case '3.1': 
                    const mssvToUpdateFaculty = await askQuestion("Nhập MSSV: ");
                    const newFaculty = await askQuestion("Nhập khoa mới: ");
                    updateStudentFaculty(mssvToUpdateFaculty, newFaculty);
                    break;
                
                case '3.2': 
                    const mssvToUpdateStatus = await askQuestion("Nhập MSSV: ");
                    const newStatus = await askQuestion("Nhập tình trạng mới: ");
                    updateStudentStatus(mssvToUpdateStatus, newStatus);
                    break;
                
                case '3.3': 
                    const mssvToUpdateProgram = await askQuestion("Nhập MSSV: ");
                    const newProgram = await askQuestion("Nhập chương trình đào tạo mới: ");
                    updateStudentProgram(mssvToUpdateProgram, newProgram);
                    break;
                
                case '4': 
                    const searchTerm = await askQuestion("Nhập tên hoặc MSSV (bỏ trống nếu chỉ tìm theo khoa): ");
                    const faculty = await askQuestion("Nhập khoa (bỏ trống nếu chỉ tìm theo tên/MSSV): ");
                    
                    const searchResults = searchStudents(searchTerm, faculty);
                    
                    if (searchResults.length > 0) {
                        console.log("Kết quả tìm kiếm:");
                        console.table(searchResults); 
                    } else {
                        console.log(searchResults);
                    }
                    break;
                
                 case '5': 
                    const allStudents = loadStudents();
                    console.log("Tất cả sinh viên:");
                    console.log(allStudents); 
                    break;
                
                case '6': 
                    const importPath = await askQuestion("Nhập đường dẫn file (CSV/JSON): ");
                    importStudents(importPath);
                    break;

                case '7': 
                    const exportPath = await askQuestion("Nhập đường dẫn file lưu (CSV/JSON): ");
                    exportStudents(exportPath);
                    break;
                
                case '8': 
                    console.log("...Đang thoát");
                    readline.close();
                    return;
                default:
                    console.log("Lựa chọn không hợp lệ");
            }
        }
    }

    runMenu();
}

main();
