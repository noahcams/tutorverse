import express from 'express';
// import { Assignment } from '../models'

const router = express.Router()

router
    .get('/', async (req, res) => {
        // let assignments = await Assignment.find()
        
        // res.send(assignments)
        res.json({"message": "assignment"});
    })
    .post(async (req, res) => {
        try{
            const newAssignment = await new Assignment(req.body)
            newAssignment.save()    
            res.json(newAssignment)
        } catch (err){
            res.status(500).send("Error creating new assignment.")
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