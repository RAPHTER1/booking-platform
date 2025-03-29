import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool} = pkg

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const app = express();
app.use(express.json());

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userQuery.rowCount === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = userQuery.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const roleQuery = await pool.query('SELECT * FROM roles WHERE id_role = $1', [user.role_id]);
        const permissions = roleQuery.rows[0].permissions;

        const token = jwt.sign({
            id_user: user.id_user,
            email: user.email,
            permissions: permissions
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        
    }

});

app.use('/api/auth', router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Auth API is running on port ${PORT}`);
});
