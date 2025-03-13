import React, { useState } from "react";
import "../styles/popupAddStudent.css";
import { addStudent } from "../services/studentService";

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
        status: "Đang theo học",
    });

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await addStudent(student);

        if (result) {
            alert("Thêm sinh viên thành công");
            onAddStudent(student);
            onClose();
        } else {
            alert("Thêm sinh viên thất bại");
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
                    <input type="text" name="faculty" placeholder="Khoa" onChange={handleChange} required />
                    <input type="text" name="course" placeholder="Khóa" onChange={handleChange} required />
                    <input type="text" name="program" placeholder="Chương trình đào tạo" onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Địa chỉ" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Số điện thoại" onChange={handleChange} required />
                    <select name="status" onChange={handleChange}>
                        <option value="Đang theo học">Đang theo học</option>
                        <option value="Đã hoàn thành chương trình, chờ xét tốt nghiệp">Đã hoàn thành chương trình, chờ xét tốt nghiệp</option>
                        <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
                        <option value="Bảo lưu">Bảo lưu</option>
                        <option value="Đình chỉ học tập">Đình chỉ học tập</option>
                        <option value="Tình trạng khác">Tình trạng khác</option>
                    </select>
                    <button type="submit">Thêm</button>
                    <button type="button" onClick={onClose}>Hủy</button>
                </form>
            </div>
        </div>
    );
}

export default PopupAddStudent;
