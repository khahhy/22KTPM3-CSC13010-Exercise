import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

export const getDepartments = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/departments`);
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách khoa:", error);
        return [];
    }
};

export const addDepartment = async (department) => {
    try {
        const response = await fetch(`${API_BASE_URL}/departments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(department),
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi thêm khoa:", error);
        return null;
    }
};

export const deleteDepartment = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/departments/${name}`, { method: 'DELETE' });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi xóa khoa:", error);
        return null;
    }
};
