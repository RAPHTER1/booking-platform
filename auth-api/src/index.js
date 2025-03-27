import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World from Auth API');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Auth API is running on port ${PORT}`);
});