import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { getSettings, updateSettings } from "../services/settingService";
import { getDepartments, deleteDepartment } from "../services/departmentService";
import { getStatus, deleteStatus } from "../services/statusService"; 
import { getPrograms, deletePrograms } from "../services/programService"; 
import "../styles/settings.css";

function Settings() {
    const [settings, setSettings] = useState({
        allowedEmailDomain: "",
        deleteStudentTimeLimit: 1800,
        enableRules: true
    });

    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]); 
    const [programs, setPrograms] = useState([]); 

    useEffect(() => {
        async function fetchDepartments() {
            const data = await getDepartments();
            setDepartments(data);
        }
        fetchDepartments();
    }, []);

    useEffect(() => {
        async function fetchStatuses() {
            const data = await getStatus();
            setStatuses(data);
        }
        fetchStatuses();
    }, []);

    useEffect(() => {
        async function fetchPrograms() {
            const data = await getPrograms();
            setPrograms(data);
        }
        fetchPrograms();
    }, []);

    useEffect(() => {
        async function fetchSettings() {
            const data = await getSettings();
            setSettings(data);
        }
        fetchSettings();
    }, []);
    

    const handleSave = async () => {
        const response = await updateSettings(settings);
        alert(response.message);
    };

    const handleDeleteDepartment = async (name) => {
        const response = await deleteDepartment(name);
        if (response && response.message) {
            alert(response.message);
            if (response.message === "Xóa khoa thành công") {
                setDepartments(departments.filter(dept => dept.name !== name));
            }
        } else {
            alert("Có lỗi");
        }
    };

    const handleDeleteStatus = async (name) => {
        const response = await deleteStatus(name);
        if (response && response.message) {
            alert(response.message);
            if (response.message === "Xóa tình trạng thành công") {
                setStatuses(statuses.filter(status => status.name !== name));
            }
        } else {
            alert("Có lỗi");
        }
    };

    const handleDeleteProgram = async (name) => {
        const response = await deletePrograms(name);
        if (response && response.message) {
            alert(response.message);
            if (response.message === "Xóa chương trình thành công") {
                setPrograms(programs.filter(program => program.name !== name));
            }
        } else {
            alert("Có lỗi");
        }
    };

    return (
        <div className="settings-container">
            <Header />

            <div className="settings-content">
                <div className="setting-session">
                    <h2 className="settings-title">Cấu hình hệ thống</h2>
                    <label>Email hợp lệ:</label>
                    <input type="text"
                        value={settings.allowedEmailDomain}
                        onChange={(e) => setSettings({ ...settings, allowedEmailDomain: e.target.value })}
                    />
            
                    <label>Thời gian xóa sinh viên (giây):</label>
                    <input type="number"
                        value={settings.deleteStudentTimeLimit}
                        onChange={(e) => setSettings({ ...settings, deleteStudentTimeLimit: Number(e.target.value) })}
                    />

                    <label>Bật quy tắc:</label>
                    <input type="checkbox"
                        checked={settings.enableRules}
                        onChange={(e) => setSettings({ ...settings, enableRules: e.target.checked })}
                    />

                    <button onClick={handleSave}>Lưu cài đặt</button>
                </div>
                <br />

                <div className="setting-session">
                    <h2 className="settings-title">Cài đặt hệ thống</h2>
                    <h3 className="settings-title">Quản lý Khoa</h3>
                    <ul>
                        {departments.map((dept, index) => (
                            <li key={index}>
                                {dept.name} 
                                <button onClick={() => handleDeleteDepartment(dept.name)}>Xóa</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="setting-session">
                    <h3 className="settings-title">Quản lý Tình Trạng Sinh Viên</h3>
                    <ul>
                        {statuses.map((status, index) => (
                            <li key={index}>
                                {status.name} 
                                <button onClick={() => handleDeleteStatus(status.name)}>Xóa</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="setting-session">
                    <h3 className="settings-title">Quản lý Chương trình đào tạo</h3>
                    <ul>
                        {programs.map((program, index) => (
                            <li key={index}>
                                {program.name} 
                                <button onClick={() => handleDeleteProgram(program.name)}>Xóa</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Settings;
