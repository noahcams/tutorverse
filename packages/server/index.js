import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express()
const port = 3001

mongoose.connect('mongodb://localhost:27017/tutorverse');

mongoose.connection.on('connected', () => {
  console.log('connected to mongoDB')
})

mongoose.connection.on('error', (err) => {
  console.log('err connecting', err);
})

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log(`Tutorverse listening at http://localhost:${port}`)
})