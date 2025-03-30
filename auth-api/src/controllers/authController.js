import { findUserByEmail } from '../models/userModel.js';
import { findRoleById } from '../models/roleModel.js';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger.js';
import { createToken } from '../utils/jwt.js';

export async function login(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            logger.warn('Failed login attempt: user not found', { email });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            logger.warn('Failed login attempt: invalid password', { email });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const role = await findRoleById(user.role_id);

        const payload = {
            id_user: user.id_user,
            email: user.email,
            permissions: role.permissions
        };

        const token = createToken(payload);

        logger.info('User logged in successfully', { userId: user.id_user, email: user.email });
        res.json({ token});

    } catch (err) {
        logger.error('Login failed', { error: err.message });
        next(err);
    }
}

        
