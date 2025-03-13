import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

export async function getStudents() {
    try {
        const response = await axios.get(`${API_BASE_URL}/students`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sinh viên:", error);
        return [];
    }
}

export async function getStudentById(mssv) {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/${mssv}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy sinh viên MSSV ${mssv}:`, error);
        return null;
    }
}

export async function addStudent(studentData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/students`, studentData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm sinh viên:", error);
        return error.response ? error.response.data : { message: "Lỗi không xác định" };
    }
}

export async function updateStudent(mssv, updatedData) {
    try {
        const response = await axios.put(`${API_BASE_URL}/students/${mssv}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật sinh viên MSSV ${mssv}:`, error);
        return error.response ? error.response.data : { message: "Lỗi không xác định" };
    }
}

export async function deleteStudent(mssv) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/students/${mssv}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xóa sinh viên MSSV ${mssv}:`, error);
        return error.response ? error.response.data : { message: "Lỗi không xác định" };
    }
}

export async function importStudents(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/students/import`, data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi import dữ liệu:", error);
        return null;
    }
}

export async function exportStudents(format = "json") {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/export?format=${format}`, {
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `students.${format}`);
        document.body.appendChild(link);
        link.click();

        return true;
    } catch (error) {
        console.error("Lỗi khi export dữ liệu:", error);
        return false;
    }
}

export const getCertificate = async (mssv, format) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/certificate/${mssv}/${format}`);
        if (!response.ok) {
            throw new Error("Lỗi khi lấy giấy xác nhận");
        }
        return await response.text(); 
    } catch (error) {
        console.error("Lỗi khi xuất giấy xác nhận:", error);
        throw error;
    }
};
