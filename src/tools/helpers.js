export const writeToLocalStorage = (key, data) => {
    return new Promise((resolve, reject) => {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}