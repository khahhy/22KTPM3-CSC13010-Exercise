import React, { useState, useEffect } from "react";
import "../styles/popupAddStudent.css";
import { addStudent } from "../services/studentService";
import { getDepartments } from '../services/departmentService';
import { getPrograms } from "../services/programService";
import { getStatus } from "../services/statusService";

function PopupAddStudent({ onClose, onAddStudent }) {
    const [student, setStudent] = useState({
        name: "",
        mssv: "",
        email: "",
        phone: "",
        dob: "",
        gender: "Nam",
        faculty: "",
        course: "",
        program: "",
        address: "",
        status: "",
    });
    const [departments, setDepartments] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [statuses, setStatus] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const data = await getDepartments(); 
            setDepartments(data);
        };
        fetchDepartments();
    }, []);

    useEffect(() => {
        const fetchPrograms = async () => {
            const data = await getPrograms();
            setPrograms(data);
        };
        fetchPrograms();
    }, []);

    useEffect(() => {
        const fetchStatuses = async () => {
            const data = await getStatus();
            setStatus(data);
        };
        fetchStatuses();
    }, []);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await addStudent(student);

        if (result && result.message) {
            alert(result.message);
            if (result.message === "Thêm sinh viên thành công") {
                onAddStudent(student);
                onClose();
            }
        } else {
            alert("Có lỗi xảy ra");
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Thêm sinh viên</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Họ và Tên" onChange={handleChange} required />
                    <input type="text" name="mssv" placeholder="MSSV" onChange={handleChange} required />
                    <input type="date" name="dob" placeholder="Ngày sinh" onChange={handleChange} required />
                    <select name="gender" onChange={handleChange}>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    <select name="faculty" onChange={handleChange}>
                        <option value="">Khoa</option>
                        {departments.length > 0 ? (
                            departments.map((dept, index) => (
                                <option key={index} value={dept.name}>
                                    {dept.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Không có khoa nào</option>
                        )}
                    </select>
                    <input type="text" name="course" placeholder="Khóa" onChange={handleChange} required />
                    <select name="program" onChange={handleChange}>
                        <option value="">Chương trình đào tạo</option>
                        {programs.length > 0 ? (
                            programs.map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Không có chương trình nào</option>
                        )}
                    </select>
                    <input type="text" name="address" placeholder="Địa chỉ" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Số điện thoại" onChange={handleChange} required />
                    <select name="status" onChange={handleChange}>
                        <option value="">Tình trạng sinh viên</option>
                        {statuses.length > 0 ? (
                            statuses.map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Không có tình trạng nào</option>
                        )}
                    </select>
                    <button type="submit">Thêm</button>
                    <button type="button" onClick={onClose}>Hủy</button>
                </form>
            </div>
        </div>
    );
}

export default PopupAddStudent;
