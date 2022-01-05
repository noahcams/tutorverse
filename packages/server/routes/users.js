import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

const router = express.Router();

router
  .get('/', async (req, res) => {
    let users = await User.find()
        users.length === 0 && res.send('please add students!')
        res.send(users)
})
  .get('/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      // res.send(user)
      res.json(user.toJSON());
    } else {
      res.status(404).end();
    }
  })

export default router;