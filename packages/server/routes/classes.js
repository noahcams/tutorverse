import express from 'express';
import { Class } from '../models'

const router = express.Router()

router
    .get('/', async (req, res) => {
        let classes = await Class.find()
        
      res.send(classes)
    })
    .post('/',async (req, res) => {
        try{
            const newClass = await new Class(req.body)
            newClass.save()
    
            res.json(newClass)
        } catch (err){
            res.status(500).send("Error creating new class.")
        }
    })

module.exports = router