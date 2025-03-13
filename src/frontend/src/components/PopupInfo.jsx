import React from "react";
import "../styles/popupInfo.css";

function PopupInfo({ student, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Thông tin sinh viên</h2>
        <table className="info-table">
          <tbody>
            <tr><td><strong>MSSV:</strong></td><td>{student.mssv}</td></tr>
            <tr><td><strong>Họ và tên:</strong></td><td>{student.name}</td></tr>
            <tr><td><strong>Ngày sinh:</strong></td><td>{student.dob}</td></tr>
            <tr><td><strong>Giới tính:</strong></td><td>{student.gender}</td></tr>
            <tr><td><strong>Khoa:</strong></td><td>{student.faculty}</td></tr>
            <tr><td><strong>Khóa:</strong></td><td>{student.course}</td></tr>
            <tr><td><strong>Chương trình:</strong></td><td>{student.program}</td></tr>
            <tr><td><strong>Địa chỉ:</strong></td><td>{student.address}</td></tr>
            <tr><td><strong>Email:</strong></td><td>{student.email}</td></tr>
            <tr><td><strong>Số điện thoại:</strong></td><td>{student.phone}</td></tr>
            <tr><td><strong>Tình trạng:</strong></td><td>{student.status}</td></tr>
          </tbody>
        </table>
        <button className="close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}

export default PopupInfo;
