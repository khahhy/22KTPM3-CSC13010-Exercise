const API_BASE_URL = "http://localhost:5000/api"; 

export const getSettings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/settings`);
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách cài đặt:", error);
        return [];
    }
};

export const updateSettings = async (settings) => {
    const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
    });
    return response.json();
};