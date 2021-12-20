import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models';

const router = express.Router();

router
  .route('/:id')
  .get('/', async (req, res) => {
    let users = await User.find()
    res.send(users)
})
  .get(async (req, res) => {
    const user = await User.findOne({ username: req.params.id });
    if (user) {
      res.json(user.toJSON());
    } else {
      res.status(404).end();
    }
  })
  .post('/create', async (req, res) => {
    let newUser = await new User.find(req.body)
    newUser.save()

    res.json(newUser)
})
// .delete()

module.exports = router;