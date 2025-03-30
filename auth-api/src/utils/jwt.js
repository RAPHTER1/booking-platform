import jwt from 'jsonwebtoken';

/**
 *  Creates a JWT token with a variable duration based on the environment.
 * 
 * @param {Object} payload - The payload to encode in the token.
 * @returns {string} The JWT token.
 */
export function createToken(payload) {
    let expiresIn

    switch (process.env.NODE_ENV) {
        case 'production':
            expiresIn = '1h';
            break;
        case 'test':
            expiresIn = '1m';
            break;
        default:
            expiresIn = '24h';
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}


