const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const historyRoutes = require('./src/routes/historyRoutes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', historyRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
