const generateUniqueOrderId = () => {
    const timestamp = Date.now(); // Waktu saat ini dalam milidetik
    const prefix = 'ORDER';
    return `${prefix}_${timestamp}`;
};

module.exports = {
    generateUniqueOrderId
}