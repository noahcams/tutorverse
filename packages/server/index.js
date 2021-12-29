import express from 'express'
import router from './routes/index.js';
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World! This is back-end')
})

<<<<<<< HEAD
app.use('/', router);
=======
// app.use('/users',userRouter)
>>>>>>> 2206c38 (working with backend server)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})