const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
