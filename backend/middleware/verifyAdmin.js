import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const verifyAdminToken = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if user is admin
            if (decoded.role !== 'Admin') {
                res.status(403);
                throw new Error('Not authorized, admin access required');
            }

            // Add user from payload to request
            req.user = decoded;

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export default verifyAdminToken;