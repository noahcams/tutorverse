import express from 'express';
import { Class } from '../models/index.js'

const router = express.Router()

router
    .get('/', async (req, res) => {
        const classes = await Class.find()
        classes.length === 0 && res.send('please add assignments!')
        res.send(classes)
    })
    .get('/:id', async (req, res) => {
        const classData = await Class.findOne({ _id: req.params.id})

        res.send(classData)
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

export default router