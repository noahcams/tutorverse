import express from 'express'
import router from './routes/index.js';
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World! This is back-end')
})

app.use('/', router);

app.listen(port, () => {
  console.log(`Tutorverse listening at http://localhost:${port}`)
})