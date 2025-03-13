const API_BASE_URL = "http://localhost:5000/api"; 

export const getPrograms = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/programs`);
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách:", error);
        return [];
    }
};

export const addPrograms = async (programs) => {
    try {
        const response = await fetch(`${API_BASE_URL}/programs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(programs),
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi thêm:", error);
        return null;
    }
};

export const deletePrograms = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/programs/${name}`, { method: 'DELETE' });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi xóa:", error);
        return error.response ? error.response.data : { message: "Lỗi không xác định" };
    }
};
