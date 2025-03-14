import React, { useState, useEffect } from "react";
import "../styles/popupAddStudent.css";
import { updateStudent } from "../services/studentService";
import { formatDate } from "../utils";
import { getDepartments } from '../services/departmentService';
import { getPrograms } from "../services/programService";
import { getStatus } from "../services/statusService";

function PopupUpdateStudent({ onClose, student, onUpdateStudent }) {
    const [updatedStudent, setUpdatedStudent] = useState(student);
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

    useEffect(() => {
        setUpdatedStudent(student);
    }, [student]);

    const handleChange = (e) => {
        setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await updateStudent(updatedStudent.mssv, updatedStudent);

        if (result && result.message) {
            alert(result.message);
            if (result.message === "Cập nhật sinh viên thành công") {
                onUpdateStudent(updatedStudent);
                onClose();
            }
        } else {
            alert("Có lỗi xảy ra");
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Cập nhật sinh viên</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={updatedStudent.name} onChange={handleChange} required />
                    <input type="text" name="mssv" value={updatedStudent.mssv} readOnly />
                    <input type="date" name="dob" value={formatDate(updatedStudent.dob)} onChange={handleChange} required />
                    <select name="gender" value={updatedStudent.gender} onChange={handleChange}>
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
                    <input type="text" name="course" value={updatedStudent.course} onChange={handleChange} required />
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
                    <input type="text" name="address" value={updatedStudent.address} onChange={handleChange} required />
                    <input type="email" name="email" value={updatedStudent.email} onChange={handleChange} required />
                    <input type="text" name="phone" value={updatedStudent.phone} onChange={handleChange} required />
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
                    <button type="submit">Cập nhật</button>
                    <button type="button" onClick={onClose}>Hủy</button>
                </form>
            </div>
        </div>
    );
}

export default PopupUpdateStudent;
