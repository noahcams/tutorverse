<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<<< HEAD:packages/server/routes/index.js
import mongoose from 'mongoose'

const express = require('express')
========
import express from 'express'
import router from './routes/index.js';
>>>>>>>> 18c3a9e (Connected the assignment route):packages/server/index.js
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World! This is back-end')
})

<<<<<<<< HEAD:packages/server/routes/index.js
// app.use('/users',userRouter)
========
app.use('/', router);
>>>>>>>> 18c3a9e (Connected the assignment route):packages/server/index.js

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app
=======
=======
>>>>>>> e3714ed (working on back-end stuff)
import express from 'express';
import { default as assignmentRouter } from './assignments.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.use('/assignment', assignmentRouter);

export default router;
<<<<<<< HEAD
>>>>>>> 18c3a9e (Connected the assignment route)
=======
=======
<<<<<<<< HEAD:packages/server/routes/index.js
import mongoose from 'mongoose'

const express = require('express')
========
import express from 'express'
import router from './routes/index.js';
>>>>>>>> 6996957 (working on back-end stuff):packages/server/index.js
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

module.exports = app
>>>>>>> 6996957 (working on back-end stuff)
>>>>>>> e3714ed (working on back-end stuff)
