const express = require('express');
const dotEnv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MONGOOSE CONNECTED!');
  });

app.get('/', (req, res) => {
  res.send('HEY THERE!');
});

app.use('/auth', require('./Routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
