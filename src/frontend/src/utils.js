export const formatDate = (dateString) => {
    if (!dateString) return ""; 
    const parts = dateString.split("/");
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; 
    }

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
    }

    return ""; 
};
