import app from './app.js';
import dotenv from 'dotenv';

if (process.env.NODE.ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 3002;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Admin API is running on port ${PORT}`)
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
   }
}

startServer();