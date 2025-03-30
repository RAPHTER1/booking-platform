import express from 'express';
import { login } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Login endpoint (public)
router.post('/login', login);

// Token verification endpoint (public)
router.get('/verify-token', verifyToken, (req, res) => {
    res.json({
        valid: true,
        user: req.user,
    });
});

// Protected route (requires authentication)
// router.get('/profile', verifyToken, (req, res) => {
//     res.json({
//         message: 'Profile accessed successfully',
//         user: req.user
//     });
// });

export default router;