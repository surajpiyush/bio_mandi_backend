const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({status:false, error: 'Access denied' });
    }

    const token = authHeader.split(' ')[1]; // Assuming the header is in the format "Bearer <token>"
    if (!token) {
        return res.status(401).json({status:false,message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({status:false, message: 'Invalid token' });
    }
}

module.exports = verifyToken;
