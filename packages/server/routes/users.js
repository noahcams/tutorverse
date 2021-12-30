import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

const router = express.Router();

router
  .get('/', async (req, res) => {
    // let users = await User.find()
    // res.send(users)
    
    res.send(req.body)
})
  .get('/:id',async (req, res) => {
    const user = await User.findOne({ id: req.params.id });
    if (user) {
      res.json(user.toJSON());
    } else {
      res.status(404).send("User not found");
    }
  })
  .put('/', async (req, res) => {
    // let user = new User(req.body)
    // user.save()

    // res.json({ "id":12345678 })
    res.json(JSON.stringify(req));
})
// .delete()

export default router;