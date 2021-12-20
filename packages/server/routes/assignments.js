import express from 'express';
import { Assignment } from '../models'

const router = express.Router()

router
    .route('/:id')
    .get(async (req, res) => {
        let assignments = await Assignment.find()
        
        res.send(assignments)
    })
    .post('/create', async (req, res) => {
        try{
            const newAssignment = await new Assignment(req.body)
            newAssignment.save()    
            res.json(newAssignment)
        } catch (err){
            res.status(500).send("Error creating new assignment.")
        }        
    })
    .delete('/delete/:id', async (req, res) => {
        try{
            Assignment.delete()
        } catch (err){
            res.status(500).send("Error deleting assignment.")
        }
    })

module.exports = router