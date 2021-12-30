import express from 'express';
import { default as assignmentRouter } from './assignments.js';
import { default as classRouter } from './classes.js';
import { default as userRouter } from './users.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.use('/assignment', assignmentRouter);
router.use('/class', classRouter);
router.use('/user', userRouter);

export default router;