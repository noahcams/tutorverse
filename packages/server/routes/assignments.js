import express from 'express';
import { Assignment } from '../models/index.js'

const router = express.Router()

router
    .get('/', async (req, res) => {
        let assignments = await Assignment.find();
        assignments.length === 0 && res.send('please add assignments!')
        res.send(assignments);
        // console.log(assignments)
    })
    .get('/:id', async (req, res) => {
        const id = req.params.id
        const assignment = await Assignment.findOne( { _id: id} )
        if (!assignment) throw new Error('Assignment not found')
        res.send(assignment)
    })
    .post('/',async (req, res) => {
        try{
            const newAssignment = new Assignment(req.body)
            newAssignment.save()    
            res.send(newAssignment)
        } catch (err){
            res.status(404).send("Error creating new assignment.")
        }        
    })
    .delete(async (req, res) => {
        try{
            Assignment.delete()
        } catch (err){
            res.status(500).send("Error deleting assignment.")
        }
    })

export default router;