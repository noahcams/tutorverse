import express from 'express';
import bcrypt from 'bcryptjs';
import { User, Class } from '../models/index.js';

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
  .patch('/:id', async (req, res) => {

    const id = req.params.id;
    try {
      const user = await User.findOne( { _id: id} )
      if (!user) throw Error ('User not found')

      const classes = await Class.find( { teacher: id })

      classes.forEach(c => {
        if (!user.classIds.includes(c._id)) {
          user.classIds = [...user.classIds, c._id]
        } 
      })
      
      user.save()
      res.json(user)
    } catch (err) {
      console.log(err);
      res.status(500).send(err)
    }
  })
  .delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const user = await User.findByIdAndDelete( { _id: id } )
      if (!user) throw new Error('User not found')
      
    } catch (err) {
      console.log(err)
    }
    res.send('user deleted')
  })

export default router;