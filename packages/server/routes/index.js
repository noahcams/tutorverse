import express from 'express';
import { default as assignmentRouter } from './assignments.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.use('/assignment', assignmentRouter);

export default router;