import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Public API');
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Public API running on port ${PORT}`);
});
