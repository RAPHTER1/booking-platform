import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Admin API');
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Admin API running on port ${PORT}`);
});
