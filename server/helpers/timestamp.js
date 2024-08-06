const generateUniqueOrderId = () => {
    const timestamp = Date.now();
    const prefix = 'ORDER';
    return `${prefix}_${timestamp}`;
};

module.exports = {
    generateUniqueOrderId
}