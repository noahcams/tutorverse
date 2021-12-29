import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models';

const router = express.Router();

router
  .get('/', async (req, res) => {
    let users = await User.find()
    res.send(users)
})
  .get('/:id',async (req, res) => {
    const user = await User.findOne({ id: req.params.id });
    if (user) {
      res.json(user.toJSON());
    } else {
      res.status(404).send("User not found");
    }
  })
  .post('/create', async (req, res) => {
    let newUser = await new User.find(req.body)
    newUser.save()

    res.json(newUser)
})
// .delete()

module.exports = router;