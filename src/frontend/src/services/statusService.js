const API_BASE_URL = "http://localhost:5000/api"; 

export const getStatus = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/status`);
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách:", error);
        return [];
    }
};

export const addStatus = async (status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(status),
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi thêm:", error);
        return null;
    }
};

export const deleteStatus = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/status/${name}`, { method: 'DELETE' });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi xóa:", error);
        return error.response ? error.response.data : { message: "Lỗi không xác định" };
    }
};
