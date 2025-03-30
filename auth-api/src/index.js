import app from './app.js';
import dotenv from 'dotenv';
import { testDatabaseConnection } from './config/database.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await testDatabaseConnection();
        app.listen(PORT, () => {
            console.log(`Auth API is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();