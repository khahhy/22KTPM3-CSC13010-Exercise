import React, { useState, useEffect } from 'react';
import PopupInfo from './PopupInfo';
import PopupUpdateStudent from './PopupUpdateStudent';
import Toolbar from './Toolbar';
import "../styles/table.css";

import { getStudents, deleteStudent } from '../services/studentService';

function InfoTable() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [modalType, setModalType] = useState(null);
    
    const fetchData = async () => {
        const data = await getStudents();
        setStudents(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = async (keyword, department) => {
        const data = await getStudents();
        const filteredStudents = data.filter(student => 
            (keyword === "" || student.name.toLowerCase().includes(keyword.toLowerCase())) &&
            (department === "" || student.faculty === department)
        );
        setStudents(filteredStudents);
    };

    const addStudent = (newStudent) => {
        setStudents([newStudent, ...students]);
    };

    const removeStudent = async (mssv) => {
        if (window.confirm("Bạn có chắc muốn xóa sinh viên này?")) {
            const result = await deleteStudent(mssv);
            if (result) {
                setStudents(students.filter(s => s.mssv !== mssv));
            } else {
                alert("Xóa thất bại");
            }
        }
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setModalType(null);
    };

    return (
        <div className="table-container">
            <Toolbar onAddStudent={(newStudent) => setStudents([newStudent, ...students])} onRefresh={fetchData} onSearch={handleSearch} />
            <table>
                <thead>
                    <tr>
                        <th scope="col">Họ và Tên</th>
                        <th scope="col">MSSV</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Tình trạng</th>
                        <th scope="col">Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.mssv}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.status}</td>
                            <td className="actions">
                                <button className="detail-btn" onClick={() => { setSelectedStudent(item); setModalType('info'); }}>Chi tiết</button>
                                <span className="edit-btn" onClick={() => { setSelectedStudent(item); setModalType('update'); }}>✏️</span>
                                <span className="delete-btn" onClick={() => removeStudent(item.mssv)}>🗑️</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {selectedStudent && modalType === 'info' && (
                <PopupInfo student={selectedStudent} onClose={handleCloseModal} />
            )}

            {selectedStudent && modalType === 'update' && (
                <PopupUpdateStudent
                    student={selectedStudent}
                    onClose={handleCloseModal}
                    onUpdateStudent={(updatedStudent) => {
                        setStudents(students.map(s => s.mssv === updatedStudent.mssv ? updatedStudent : s));
                    }}
                />
            )}

            <div className="pagination">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <span>...</span>
                <button className="page-btn">10</button>
                <button className="page-btn">11</button>
                <button className="page-btn">{">"}</button>
                </div>
        </div>
    );
}

export default InfoTable;