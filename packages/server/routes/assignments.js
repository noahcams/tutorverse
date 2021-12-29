import express from 'express';
import { Assignment } from '../models'

const router = express.Router()

router
    .route('/:id')
    .get(async (req, res) => {
        let assignments = await Assignment.find()
        
        res.send(assignments)
    })
    .get('/:id',async (req, res) => {
        const assignment = await Assignment.findOne({ id : req.params.id });
        if (assignment) {
          res.json(assignment.toJSON());
        } else {
          res.status(404).send("User not found");
        }
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