import React, { useRef, useState, useEffect } from 'react';
import PopupAddStudent from './PopupAddStudent';
import { importStudents, getStudents } from '../services/studentService';
import { getDepartments } from '../services/departmentService';
import Papa from 'papaparse';
import "../styles/toolbar.css";

function Toolbar({ onAddStudent, onRefresh, onSearch }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const inputFileRef = useRef(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            const data = await getDepartments(); 
            setDepartments(data);
        };
        fetchDepartments();
    }, []);

    const handleImportClick = () => {
        inputFileRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop().toLowerCase();

        if (fileExt === 'csv') {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    const parsedData = results.data;
                    const result = await importStudents(parsedData);
                    if (result) {
                        alert("Import CSV thành công!");
                        onRefresh();
                    } else {
                        alert("Import CSV thất bại!");
                    }
                },
                error: (error) => {
                    console.error("Lỗi khi phân tích CSV:", error);
                    alert("Lỗi khi phân tích CSV!");
                }
            });
        } else if (fileExt === 'json') {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    const result = await importStudents(jsonData);
                    if (result) {
                        alert("Import JSON thành công!");
                        onRefresh();
                    } else {
                        alert("Import JSON thất bại!");
                    }
                } catch (error) {
                    console.error("Lỗi khi đọc JSON:", error);
                    alert("Lỗi khi đọc JSON!");
                }
            };
            reader.readAsText(file);
        } else {
            alert("Định dạng tệp không được hỗ trợ. Vui lòng chọn tệp CSV hoặc JSON.");
        }
    };

    const handleExport = async () => {
        try {
            const students = await getStudents(); 
            const jsonData = JSON.stringify(students, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
    
            if ('showSaveFilePicker' in window) {
                const handle = await window.showSaveFilePicker({
                    suggestedName: 'students.json',
                    types: [{
                        description: 'JSON Files',
                        accept: { 'application/json': ['.json'] },
                    }],
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
            } else {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'students.json';
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            }
    
            alert("Xuất dữ liệu thành công!");
        } catch (error) {
            console.error("Lỗi khi xuất dữ liệu:", error);
            alert("Xuất dữ liệu thất bại!");
        }
    };
    
    const handleSearch = () => {
        onSearch(searchTerm, selectedDepartment);
    };

    return (
        <>
            <div className="toolbar">
                <div className="toolbar-left">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="dropdown"
                        value={selectedDepartment}
                        onChange={(e) => {
                            setSelectedDepartment(e.target.value);
                        }}
                    >
                        <option value="">Tất cả khoa</option>
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

                    <button className="apply-btn" onClick={handleSearch}>Áp dụng</button>
                </div>

                <div className="toolbar-right">
                <input
                        type="file"
                        accept=".json,.csv"
                        ref={inputFileRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <button className="secondary-btn" onClick={handleImportClick}>Import</button>
                    <button className="secondary-btn" onClick={handleExport}>Export</button>
                    <button className="primary-btn" onClick={() => setIsPopupOpen(true)}>Thêm sinh viên</button>
                </div>
            </div>

            {isPopupOpen && (
                <PopupAddStudent onClose={() => setIsPopupOpen(false)} onAddStudent={onAddStudent} />
            )}
        </>
        
    );
}

export default Toolbar;