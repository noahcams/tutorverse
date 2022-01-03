import express from 'express';
import { default as assignmentRouter } from './assignments.js';
import { default as userRouter } from './users.js';
import { default as authRouter } from './auth.js';
import { default as classRouter } from './classes.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.use('/assignments', assignmentRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/classes', classRouter);

export default router;