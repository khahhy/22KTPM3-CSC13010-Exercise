import React, { useState } from "react";
import "../styles/popupInfo.css";
import { getCertificate } from "../services/studentService";

function PopupInfo({ student, onClose }) {
    const [showPurposePopup, setShowPurposePopup] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState("Xác nhận đang học để vay vốn ngân hàng");
    const [customReason, setCustomReason] = useState("");

    const purposeOptions = [
        "Xác nhận đang học để vay vốn ngân hàng",
        "Xác nhận làm thủ tục tạm hoãn nghĩa vụ quân sự",
        "Xác nhận làm hồ sơ xin việc / thực tập",
        "Lý do khác"
    ];

    const handleExportCertificate = async (format) => {
        setShowPurposePopup(true);
    };

    const handleConfirmExport = async (format) => {
        setShowPurposePopup(false);
        const reason = selectedPurpose === "Lý do khác" ? customReason : selectedPurpose;

        try {
            const content = await getCertificate(student.mssv, format, reason);
            if (format === "html") {
                const newWindow = window.open();
                newWindow.document.write(content);
                newWindow.document.close();
            } else if (format === "md") {
                const blob = new Blob([content], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "giay_xac_nhan.md";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        } catch (error) {
            alert("Lỗi khi xuất giấy xác nhận!");
        }
    };

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
                <button onClick={() => handleExportCertificate("html")}>Xuất giấy xác nhận</button>
                <button className="close-btn" onClick={onClose}>Đóng</button>
            </div>

            {showPurposePopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Chọn Mục Đích Giấy Xác Nhận</h2>
                        <label>Mục đích:</label>
                        <select value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)}>
                            {purposeOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>

                        {selectedPurpose === "Lý do khác" && (
                            <div>
                                <label>Nhập lý do:</label>
                                <input 
                                    type="text" 
                                    value={customReason} 
                                    onChange={(e) => setCustomReason(e.target.value)}
                                    placeholder="Nhập lý do cụ thể"
                                />
                            </div>
                        )}

                        <button onClick={() => handleConfirmExport("html")}>Xác nhận & Xuất HTML</button>
                        <button onClick={() => handleConfirmExport("md")}>Xác nhận & Xuất Markdown</button>
                        <button className="close-btn" onClick={() => setShowPurposePopup(false)}>Hủy</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default PopupInfo;
