import React, { useState, useEffect } from "react";
import "../styles/popupAddStudent.css";
import { updateStudent } from "../services/studentService";

function PopupUpdateStudent({ onClose, student, onUpdateStudent }) {
    const [updatedStudent, setUpdatedStudent] = useState(student);

    useEffect(() => {
        setUpdatedStudent(student);
    }, [student]);

    const handleChange = (e) => {
        setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await updateStudent(updatedStudent.mssv, updatedStudent);

        if (result) {
            alert("Cập nhật sinh viên thành công");
            onUpdateStudent(updatedStudent);
            onClose();
        } else {
            alert("Cập nhật thất bại");
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Cập nhật sinh viên</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={updatedStudent.name} onChange={handleChange} required />
                    <input type="text" name="mssv" value={updatedStudent.mssv} readOnly />
                    <input type="date" name="dob" value={updatedStudent.dob} onChange={handleChange} required />
                    <select name="gender" value={updatedStudent.gender} onChange={handleChange}>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    <input type="text" name="faculty" value={updatedStudent.faculty} onChange={handleChange} required />
                    <input type="text" name="course" value={updatedStudent.course} onChange={handleChange} required />
                    <input type="text" name="program" value={updatedStudent.program} onChange={handleChange} required />
                    <input type="text" name="address" value={updatedStudent.address} onChange={handleChange} required />
                    <input type="email" name="email" value={updatedStudent.email} onChange={handleChange} required />
                    <input type="text" name="phone" value={updatedStudent.phone} onChange={handleChange} required />
                    <select name="status" value={updatedStudent.status} onChange={handleChange}>
                        <option value="Đang theo học">Đang theo học</option>
                        <option value="Đã hoàn thành chương trình, chờ xét tốt nghiệp">Đã hoàn thành chương trình, chờ xét tốt nghiệp</option>
                        <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
                        <option value="Bảo lưu">Bảo lưu</option>
                        <option value="Đình chỉ học tập">Đình chỉ học tập</option>
                        <option value="Tình trạng khác">Tình trạng khác</option>
                    </select>
                    <button type="submit">Cập nhật</button>
                    <button type="button" onClick={onClose}>Hủy</button>
                </form>
            </div>
        </div>
    );
}

export default PopupUpdateStudent;
