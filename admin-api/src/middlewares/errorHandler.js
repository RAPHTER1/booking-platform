import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
    logger.error(err.message, {
        stack: err.stack,
        url: req.url,
        method: req.method,
    });

    res.status(500).json({
        message: 'Internal server error'
    });
}