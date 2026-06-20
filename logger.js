const logRequest = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url, body } = req;
    console.log(`[${timestamp}] ${method} ${url} - Body:`, body);
    next();
};

module.exports = logRequest;