import express from 'express';
// import { Assignment } from '../models'

const router = express.Router()

router
    .get('/', async (req, res) => {
        // let assignments = await Assignment.find()
        
        // res.send(assignments)
        res.json({"message": "assignment"});
    })
<<<<<<< HEAD
    .get('/:id',async (req, res) => {
        const assignment = await Assignment.findOne({ id : req.params.id });
        if (assignment) {
          res.json(assignment.toJSON());
        } else {
          res.status(404).send("User not found");
        }
      })
    .post('/create', async (req, res) => {
=======
    .post(async (req, res) => {
>>>>>>> 18c3a9e (Connected the assignment route)
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